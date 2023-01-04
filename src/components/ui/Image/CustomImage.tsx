import {Component, createSignal, onMount} from "solid-js";
import classes from './Image.module.scss';

type ImageProps = {
    src: string;
    width: number;
    height: number;
    alt: string;
    className?: string
    quality?: number
}

const CustomImage: Component<ImageProps> = (props: ImageProps) => {


    const {
        src,
        width,
        alt,
        height,
        className,
        quality
    } = props


    const [isLoaded, setIsLoaded] = createSignal(false)

    onMount(() => {
        const img = new Image(width, height)
        img.src = src

        img.onload = () => {
            setIsLoaded(true)
        }
    })


    return (
        <
            // class={classes.container}
        >
            {!isLoaded() ?
                <div
                    class={classes.placeholder}
                /> : <img
                    src={src}
                    alt={alt}
                    height={height}
                    width={width}
                    class={`${className ? className : ""} ${classes.image} `}
                    // style={{objectFit: 'cover'}}

                />
            }

        </>
    );
};

export default CustomImage;