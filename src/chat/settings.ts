
export interface Settings {
    mode: 'Normal' | 'Bullet' | 'NewsTicker';

    font: {
        size: string;
        name: string;
    }

    stroke: string;
}

export const UserSettings = {
    mode: {
        Normal: 'Normal', // Regular down-scroll
        Bullet: 'Bullet', // TODO: Is it even called like that?
        NewsTicker: 'NewsTicker' // Horizontal slim scroll
    },

    font: {
        size: {
            Big: '48px',
            Medium: '34px',
            Small: '20px'
        },
        name: {
            Baloo_Tammudu: 'Baloo Tammudu',
            Segoe_UI: 'Segoe UI',
            Roboto: 'Roboto',
            Lato: 'Lato',
            Noto_Sans: 'Noto Sans',
            Source_Code_Pro: 'Source Code Pro',
            Impact: 'Impact',
            Comfortaa: 'Comfortaa',
            Dancing_Script: 'Dancing Script',
            Indie_Flower: 'Indie Flower',
            Open_Sans: 'Open Sans',
            Alsina: 'Alsina'
        }
    },

    stroke: {
        None: '0px', // TODO: Check for this special case?
        Thin: '1px',
        Medium: '2px',
        Thick: '3px',
        Thicker: '4px'
    },

    shadow: {
        None: '0px',
        Small: '2px',
        Medium: '4px',
        Large: '6px'
    },


}


export const ModeSettings = {
    Normal: {
        centerOnColon: false, // true for StreamElements style
        newMsgAnimation: {
            None: 'None',
            SlideIn: 'SlideIn', // From the side, like StreamElements
            ScrollIn: 'ScrollIn',
        },
        oldMsgAnimation: {
            None: 'None',
            SlideOut: 'SlideOut',
            FadeOut: 'FadeOut',
        },
        oldMsgFade: 0, // in seconds, 0 = no fade
    },
    Bullet: {
        enableOn: { // bitmask
            Off: 0,
            Raid: 1,
        }
    },
    NewsTicker: {
        style: {
            ShowLatest: 'ShowLatest',
            LoopLatest: 'LoopLatest',
        },
        scrollSpeed: 3, // TODO: px/s?
    }
}

export const DefaultSettings = {
    mode: UserSettings.mode.Normal,

    font: {
        name: UserSettings.font.name.Open_Sans,
        size: UserSettings.font.size.Medium
    },
    stroke: UserSettings.stroke.Thin,
    shadow: UserSettings.shadow.Small,

    allCaps: false,
    nlAfterName: false,
    showSpecialBadges: true,
    showBots: false,
    showBotCommands: false,
    useBotListAPI: true, // TODO: use https://twitchbots.info/api
    customBotList: [],

    modeSettings: {
        animation: UserSettings.ModeSettings[UserSettings.Mode.Normal].animation,
        fade: UserSettings.ModeSettings[UserSettings.Mode.Normal].fade
    }
}
