// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import tailwindcss from "@tailwindcss/vite";

const TEXT_COLOR = '#ffffff';
const MUTED_TEXT_COLOR = '#D6D6D6';

const CONTENT_BG_COLOR = '#191919';
const CONTENT_BG_COLOR_2 = '#1f2228';

const PRIMARY_COLOR = '#FCB755';
const PRIMARY_HOVER_COLOR = '#FFCB82';
const PRIMARY_CONTRAST_COLOR = '#191919';

const SECONDARY_COLOR = '#7060FF';
const SECONDARY_HOVER = '#8A7DFA';
const SECONDARY_CONTRAST_COLOR = '#fff';

const SUCCESS_COLOR = '#21B36C';
const SUCCESS_HOVER = '#26CE7C';
const SUCCESS_CONTRAST_COLOR = '#fff';

const DANGER_COLOR = '#cf2e2e';
const DANGER__CONTRAST_COLOR = '#fff';


const MyPreset = definePreset(Aura, {
    extend: {
        custom: {
            primary: {
                background: PRIMARY_COLOR,
                color: PRIMARY_CONTRAST_COLOR,
            },
            secondary: {
                background: SECONDARY_COLOR,
                color: SECONDARY_CONTRAST_COLOR
            },
            danger: {
                background: DANGER_COLOR,
                color: DANGER__CONTRAST_COLOR
            }
        }
    },
    components: {
        datatable: {
            headerCell: {
                color: PRIMARY_COLOR,
            }
        },
        tag: {
            fontWeight: 500,
            colorScheme: {
                dark: {
                    // primary: {
                    //     background: PRIMARY_COLOR,
                    //     color: PRIMARY_CONTRAST_COLOR,
                    // },
                    // secondary: {
                    //     background: SECONDARY_COLOR,
                    //     color: SECONDARY_CONTRAST_COLOR
                    // },
                    // danger: {
                    //     background: DANGER_COLOR,
                    //     color: DANGER__CONTRAST_COLOR
                    // }
                }
            },
        },
        message: {
            fontWeight: 500,
            colorScheme: {
                dark: {
                    error: {
                       simple: {
                           color: '#ef9a9a',
                       }
                    }
                }
            }
        },
        button: {
            colorScheme: {
                dark: {
                    primary: {
                        activeBackground: PRIMARY_COLOR,
                        activeBorderColor: PRIMARY_COLOR,

                        hoverBackground: PRIMARY_HOVER_COLOR,
                        hoverBorderColor: PRIMARY_HOVER_COLOR,

                        background: PRIMARY_COLOR,
                        borderColor: PRIMARY_COLOR,

                        color: PRIMARY_CONTRAST_COLOR,
                    },
                    secondary: {
                        activeBackground: SECONDARY_COLOR,
                        activeBorderColor: SECONDARY_COLOR,

                        hoverBackground: SECONDARY_HOVER,
                        hoverBorderColor: SECONDARY_HOVER,

                        background: SECONDARY_COLOR,
                        borderColor: SECONDARY_COLOR,

                        color: SECONDARY_CONTRAST_COLOR,
                    },

                    success: {
                        activeBackground: SUCCESS_COLOR,
                        activeBorderColor: SUCCESS_COLOR,
                        activeColor: SUCCESS_CONTRAST_COLOR,

                        hoverBackground: SUCCESS_HOVER,
                        hoverBorderColor: SUCCESS_HOVER,
                        hoverColor: SUCCESS_CONTRAST_COLOR,

                        background: SUCCESS_COLOR,
                        borderColor: SUCCESS_COLOR,

                        color: SUCCESS_CONTRAST_COLOR,
                    }
                }
            }
        }
    },
    semantic: {
        overlay: {
            modal: {
                shadow: 'none',
            }
        },
        colorScheme: {
            dark: {
                primary: {
                    color: PRIMARY_COLOR,
                    hoverColor: PRIMARY_HOVER_COLOR,
                    // contrastColor?: string;
                    // hoverColor?: string;
                    // activeColor?: string;
                },
                text: {
                    color: TEXT_COLOR,
                    mutedColor: MUTED_TEXT_COLOR
                },
                content: {
                    color: TEXT_COLOR,
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    background: CONTENT_BG_COLOR,
                },
                formField: {
                    background: '#2a2d34',
                    disabledBackground: '#2a2d34',
                    filledBackground: '#2a2d34',
                    filledHoverBackground: '#2f323a',
                    filledFocusBackground: '#343841',
                    borderColor: '#2a2d34',
                    hoverBorderColor: '#2a2d34',          // Still hidden on hover
                    focusBorderColor: '#2a2d34',          // Hidden on focus
                    invalidBorderColor: '#e57373',        // Visible red border only on error
                    color: '#e0e0e0',
                    disabledColor: '#6c7077',
                    placeholderColor: '#9ea3ab',
                    invalidPlaceholderColor: '#ef9a9a',
                    floatLabelColor: '#9ea3ab',
                    floatLabelFocusColor: '#4dabf7',
                    floatLabelActiveColor: '#e0e0e0',
                    floatLabelInvalidColor: '#e57373',
                    iconColor: '#9ea3ab',
                    shadow: 'none'
                },
                overlay: {
                    select: {
                        background: '#2a2d34',
                        borderColor: '#1f2228',
                        color: '#e0e0e0'
                    },
                    modal: {
                        background: CONTENT_BG_COLOR_2,
                        color: TEXT_COLOR,
                        borderColor: CONTENT_BG_COLOR_2,
                    }
                },
            },

        }
    }
});

export default defineNuxtConfig({
    runtimeConfig: {
        strapi: {
            url: 'https://l2-strapi.onrender.com/'
        },
        public: {
            strapiURL: 'https://l2-strapi.onrender.com/'
        }
    },
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    modules: [
        '@nuxtjs/strapi',
        '@primevue/nuxt-module',
        '@nuxtjs/mdc',
        '@nuxtjs/supabase'
    ],
    vite: {
        plugins: [
            tailwindcss(),
        ],
    },
    supabase: {
        redirect: false
    },
    primevue: {
        options: {
            theme: {
                preset: MyPreset,
                options: {
                    darkModeSelector: '.darkmode',
                }
            },
        }
    },
    css: ['~/assets/tailwindcss.css', 'primeicons/primeicons.css', '~/assets/global.scss']
})