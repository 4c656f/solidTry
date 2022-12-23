import React from 'react';
import {Component, createEffect, createSignal, onCleanup, onMount} from "solid-js";
import classes from './create-post.module.scss'
import {marked, Renderer} from 'marked'
import Prism from 'prismjs'
import 'prismjs/components/prism-typescript'
import './codeTheme.scss'
import TextArea from '~/components/ui/TextArea/TextArea';

type IndexProps = {}

const Index: Component<IndexProps> = (props: IndexProps) => {

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
    //TEXTAREA STATE
    const [textAreaValueHtml, setTextAreaValueHtml] = createSignal('')

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
            if (Prism.languages[language]) {
                codeHighlighted = Prism.highlight(code, Prism.languages[language], language);
            } else {
                import(`prismjs/components/prism-${language}` /* @vite-ignore */)
                codeHighlighted = Prism.highlight(code, Prism.languages.js, 'js');
            }
        }

        return `<pre class="language-${language}">${fileName ? `<span class="file_name">${fileName}</span>` : ''}<code class="language-${language}">${codeHighlighted ? codeHighlighted : code}</code></pre>`
    }

    const handleMouseMove = (e: MouseEvent) => {
        e.preventDefault()
        dragContainerRef.style.width = `${e.clientX - 10}px`
    }

    const handleTouchMove = (e: TouchEvent) => {
        dragContainerRef.style.width = `${e.targetTouches[0].pageX}px`
    }

    onMount(() => {


        const mouseUpHandler = () => {
            setIsUp(false)
        }
        document.addEventListener('mouseup', mouseUpHandler)

        onCleanup(() => {
            document.removeEventListener('mouseup', mouseUpHandler)
        })
    })

    createEffect(() => {
        const html = marked(textAreaValue(), {
            renderer: renderer,
        })
        setTextAreaValueHtml(html)

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

                        onKeyUp={(e) => {
                            setTextAreaValue(e.currentTarget.value)
                        }}


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
                    innerHTML={textAreaValueHtml()}
                />


            </div>
        </div>
    )
};

export default Index;