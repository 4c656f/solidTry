import React from 'react';
import HeaderItem from "../ui/HeaderItem/HeaderItem";
import HeaderSection from "../ui/HeaderSection/HeaderSection";
import Header from "../ui/Header/Header";
import classes from "./serverHeader.module.scss";

import Button from "../ui/Button/Button";
import {A} from 'solid-start';
import {setIsDark} from "~/sharedSignals/theme";


export default function ServerHeader() {


    return (
        <div
            class={classes.header_container}
        >
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
                            ><h3>toggle</h3></Button>
                        </li>

                    ]
                }
            />
        </div>
    );
};
