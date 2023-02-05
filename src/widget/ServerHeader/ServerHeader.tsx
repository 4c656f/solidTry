import React from 'react';
import HeaderItem from "../../shared /ui/molecules /HeaderItem/HeaderItem";
import HeaderSection from "../../shared /ui/molecules /HeaderSection/HeaderSection";
import Header from "../../shared /ui/molecules /Header/Header";
import classes from "./serverHeader.module.scss";

import Button from "../../shared /ui/atoms/Button/Button";
import {A} from 'solid-start';
import {setIsDark} from "~/sharedSignals/theme";
import {Show, useContext} from 'solid-js';
import CustomImage from "~/shared /ui/atoms/Image/CustomImage";
import {UserContext} from "~/components/UserContext/UserContext";


export default function ServerHeader() {

    const user = useContext(UserContext)

    // createEffect(() => {
    //     console.log(user.resource?.loading, 'header----')
    // })

    return (
        <>
            <Header
                logoSection={
                    <li>
                        <A class={classes.logo_href} href={'/'}>
                            <h3>Logo</h3>
                        </A>
                    </li>
                }
                mainSection={
                    [<HeaderItem title={"Categories"}>
                        <HeaderSection
                            sectionTitle={<h1>All categories</h1>}
                            // headerSectionElems={[
                            //     {
                            //             elements:[
                            //                 <Button
                            //                     colorIndex={'1'}
                            //                     key={'1'}
                            //                     defaultIconStyles={true}
                            //                     icon={<ArrowIcon/>}
                            //                     size={'medium'}
                            //                     // as={Link}
                            //                     // href={`/categories/${value.name}`}
                            //                     variant={'link'}
                            //                     style={{width: '100%'}}
                            //                 >
                            //                     <h3>someBtn</h3>
                            //                 </Button>
                            //             ]
                            //         }
                            //     ]
                            // }
                        />
                    </HeaderItem>
                    ]}
                rightSection={

                    [<li
                        class={classes.right_header_section}
                    >
                        <Button
                            onClick={() => setIsDark(prev => !prev)}
                        >
                            <span>toggle</span>
                        </Button>

                    </li>,
                        <Show when={user.data?.user}>
                            <li>
                                <Button
                                    href={'/create-post'}
                                    as={A}
                                >
                                    <span>create post</span>
                                </Button>
                            </li>
                            <li>
                                <A
                                    href={'/account'}
                                    class={classes.image_link}
                                >
                                    <CustomImage
                                        src={user.data?.user?.userImage as string}
                                        width={50}
                                        height={50}
                                        alt={`user picture`}
                                        // className={classes.image}
                                    />
                                </A>
                            </li>

                        </Show>,

                        <Show when={!user.data?.user}>
                            <li>
                                <Button
                                    href={'/sign-in'}
                                    as={A}
                                >
                                        <span>
                                            signIn
                                        </span>
                                </Button>
                            </li>
                            <li>
                                <Button
                                    href={'/sign-up'}
                                    as={A}
                                >
                                        <span>
                                            signUp
                                        </span>
                                </Button>
                            </li>
                        </Show>

                    ]
                }
            />
        </>
    );
};
