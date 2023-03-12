import classes from "./LayoutMarkdownEditor.module.scss";
import type {Component} from "solid-js";
import {createEffect, createMemo, createSignal, onCleanup, onMount} from "solid-js";
import {marked, Renderer} from "marked";
import {getBaseUrl} from "~/common/baseUrl";
import {isServer} from "solid-js/web";
import DOMPurify from "dompurify";
import TextArea from "~/shared/ui/atoms/TextArea/TextArea";
import {useCustomContext} from "~/shared/helpers";
import {ContextCreatePost} from "~/entities/CreatePost/models";

import "./codeTheme.scss";
import Prism from "prismjs";
import 'prismjs/components/prism-typescript.min';
import 'prismjs/plugins/autoloader/prism-autoloader.js';

type LayoutMarkdownEditor = {}

export const LayoutMarkdownEditor: Component<LayoutMarkdownEditor> = (props) => {

    const {} = props


    const [textAreaValue, setTextAreaValue] = createSignal('# title1 \n' +
        '## title2\n' +
        '### title3\n' +
        '#### title4\n' +
        '\n' +
        'some post content\n' +
        '\n' +
        '```typescript main.ts\n' +
        'type IVariableType = {\n' +
        '   param: string\n' +
        '```' +
        '')


    //RESIZER STATE
    const [isUp, setIsUp] = createSignal(false)

    const [textTitle, setTextTitle] = createSignal('')

    //CONTAINER REF
    let dragContainerRef!: HTMLDivElement

    //TEXTAREA REF
    let textAreaRef!: HTMLTextAreaElement


    const renderer = new Renderer();


    renderer.code = function (code, params) {
        let codeHighlighted: string = ''
        let fileName
        let language
        const codeParams = params?.split(' ')

        if (codeParams) {
            [language, fileName] = codeParams;
            console.log('prism')
            if (Prism.languages[language]) {

                codeHighlighted = Prism.highlight(code, Prism.languages[language], language);
            } else {

                Prism.plugins.autoloader.loadLanguages(language, () => {
                }, () => {

                })
                codeHighlighted = Prism.highlight(code, Prism.languages.typescript, 'typescript');
            }
        }

        return `<pre class="language-${language}">${fileName ? `<span class="file_name">${fileName}</span>` : ''}<code class="language-${language}">${codeHighlighted}</code></pre>`
    }

    const handleMouseMove = (e: MouseEvent) => {
        e.preventDefault()
        dragContainerRef.style.width = `${e.clientX - 10}px`
    }

    const handleTouchMove = (e: TouchEvent) => {
        dragContainerRef.style.width = `${e.targetTouches[0].pageX}px`
    }

    onMount(() => {

        Prism.plugins.autoloader.languages_path = `${getBaseUrl()}/node_modules/prismjs/components/`

        const mouseUpHandler = () => {
            setIsUp(false)
        }

        document.addEventListener('mouseup', mouseUpHandler)

        onCleanup(() => {
            document.removeEventListener('mouseup', mouseUpHandler)
        })
    })


    createEffect(() => {
        console.log('resize event', isUp())
        if (isUp()) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('touchmove', handleTouchMove)
        }
        onCleanup(() => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('touchmove', handleTouchMove)
        })
    })
    const {setPostStore} = useCustomContext(ContextCreatePost)

    const textAreaHtmlMemo = createMemo(() => {
        const html =  marked(textAreaValue(), {
            renderer: renderer,
            sanitize: true,
            sanitizer(html: string): string {
                console.log('sanitizer', html)
                if (isServer) {
                    return html
                }
                return DOMPurify.sanitize(html, {ALLOWED_TAGS: ['p']})
            }
        })

        setPostStore("PostContent", html)

        return html
    })


    const handleKeyUp = (e: KeyboardEvent & { currentTarget: HTMLTextAreaElement, target: Element }) => {
        if (e.key === 'Tab') {

        } else {

            setTextAreaValue(e.currentTarget.value)
        }
    }

    const handleKeyDown = (e: KeyboardEvent & { currentTarget: HTMLTextAreaElement, target: Element }) => {
        if (e.key === 'Tab') {
            e.preventDefault()
            const value = e.currentTarget.value
            const start = e.currentTarget.selectionStart
            const end = e.currentTarget.selectionEnd;
            textAreaRef.setRangeText('   ', start, end, 'end')
            setTextAreaValue(value.substring(0, start) + '   ' + value.substring(end))
        }
    }


    return (
        <div
            class={classes.container}
        >
            <div
                class={classes.editor_container}
            >
                <div
                    ref={dragContainerRef}
                    class={classes.editor_container_item}
                >
                    <TextArea
                        value={textAreaValue()}
                        ref={textAreaRef}
                        onKeyUp={handleKeyUp}
                        onKeyDown={handleKeyDown}

                    />


                    <div
                        class={classes.drag}

                        onMouseDown={(e) => {
                            e.stopPropagation()
                            setIsUp(true)
                        }}
                        onTouchStart={() => {
                            setIsUp(true)
                        }}
                        onTouchEnd={() => {
                            setIsUp(true)
                        }}
                        onTouchCancel={() => {
                            setIsUp(true)
                        }}

                    />
                </div>


                <div
                    class={classes.editor_container_item_md}
                    innerHTML={textAreaHtmlMemo()}
                />


            </div>
        </div>
    );
};
