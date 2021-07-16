import React, { Fragment, useState, useEffect } from 'react';
import { MENUITEMS } from '../../../constant/menu';
import { translate } from 'react-switch-lang';

const SidebarOld = (props) => {
    const [margin, setMargin] = useState(0);
    const [width, setWidth] = useState(0);
    const [hideRightArrow, setHideRightArrow] = useState(false);
    const [hideLeftArrow, setHideLeftArrow] = useState(true);
    const [mainmenu, setMainMenu] = useState(MENUITEMS);

    useEffect(() => {

        window.addEventListener('resize', handleResize)
        handleResize();

        var currentUrl = window.location.pathname;

        mainmenu.filter(items => {
            if (items.path === currentUrl)
                setNavActive(items)
            if (!items.children) return false
            items.children.filter(subItems => {
                if (subItems.path === currentUrl)
                    setNavActive(subItems)
                if (!subItems.children) return false
                subItems.children.filter(subSubItems => {
                    if (subSubItems.path === currentUrl)
                        setNavActive(subSubItems)
                })
            })
        })

        return () => {
            window.addEventListener('resize', handleResize)
        }

    }, []);

    const handleResize = () => {
        setWidth(window.innerWidth - 310);
    }

    const setNavActive = (item) => {
        MENUITEMS.filter(menuItem => {
            if (menuItem != item)
                menuItem.active = false
            if (menuItem.children && menuItem.children.includes(item))
                menuItem.active = true
            if (menuItem.children) {
                menuItem.children.filter(submenuItems => {
                    if (submenuItems.children && submenuItems.children.includes(item)) {
                        menuItem.active = true
                        submenuItems.active = true
                    }
                })
            }
        })
        item.active = !item.active
        setMainMenu({ mainmenu: MENUITEMS })

    }

    // Click Toggle menu
    const toggletNavActive = (item) => {
        if (!item.active) {
            MENUITEMS.forEach(a => {
                if (MENUITEMS.includes(item))
                    a.active = false
                if (!a.children) return false
                a.children.forEach(b => {
                    if (a.children.includes(item)) {
                        b.active = false
                    }
                    if (!b.children) return false
                    b.children.forEach(c => {
                        if (b.children.includes(item)) {
                            c.active = false
                        }
                    })
                })
            });
        }
        item.active = !item.active
        setMainMenu({ mainmenu: MENUITEMS })
    }

    const scrollToRight = () => {

        const elmnt = document.getElementById("myDIV");
        const menuWidth = elmnt.offsetWidth;
        const temp = menuWidth + margin
        // Checking condition for remaing margin 
        if (temp < menuWidth) {
            setMargin(-temp);
            setHideRightArrow(true);
        }
        else {
            setMargin(margin => margin += -width);
            setHideLeftArrow(false);
        }

    }

    const scrollToLeft = () => {
        // If Margin is reach between screen resolution
        if (margin >= -width) {
            setMargin(0)
            setHideLeftArrow(true);
        }
        else {
            setMargin(margin => margin += width);
            setHideRightArrow(false);
        }
    }

    const getMenuItems = _ => {
        var menuItem = Array.from(Array(props.interactionCount).keys())

        return menuItem.map((item, index) => {
            return {
                title: `Interaction ${index + 1}`, type: 'button', badgeType: 'primary', active: false
            }
        })
    }
    

    return (
        <Fragment>
            <div className="page-sidebar">
                <div className="main-header-left d-none d-lg-block">
                        <div className="text-center">
                    </div>
                </div>
                <div className="sidebar custom-scrollbar">
                    <ul
                        className="sidebar-menu"
                        id="myDIV"
                        style={{ 'marginLeft': margin + 'px' }}
                    >
                        {/* {
                            props.menuItems.map((menuItem, i) =>
                                <li className={`${menuItem.active ? 'active' : ''}`} key={i}>
                                    <a className="sidebar-header" href="#" onClick={() => props.onInteractionClick(menuItem)}>
                                        <span>{props.t(menuItem.title)}</span>
                                        <i className="fa fa-angle-right pull-right"></i>
                                    </a>
                                </li>
                            )
                        } */}
                        <li className={`right-arrow ${hideRightArrow ? 'd-none' : 'hideRightArrow'}`} onClick={scrollToRight}><i className="fa fa-angle-right"></i></li>
                    </ul>
                </div>
            </div>
        </Fragment>
    );
};

export default translate(SidebarOld);

