import React from 'react';
import HeaderItem from "../ui/HeaderItem/HeaderItem";
import HeaderSection from "../ui/HeaderSection/HeaderSection";
import Header from "../ui/Header/Header";
import classes from "./serverHeader.module.scss";

import Button from "../ui/Button/Button";
import {A} from 'solid-start';
import {setIsDark} from "~/sharedSignals/theme";
import {createEffect, Show, useContext} from 'solid-js';
import CustomImage from "~/components/ui/Image/CustomImage";
import {UserContext} from "~/components/UserContext/UserContext";


export default function ServerHeader() {

    const user = useContext(UserContext)

    createEffect(() => {
        console.log(user.resource?.loading, 'header----')
    })

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
