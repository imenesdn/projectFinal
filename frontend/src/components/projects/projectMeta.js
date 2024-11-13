import EyebusProject from './EyebusProject.vue'
import WalkingVibe from './WalkingVibe.vue'

// export const projectMeta = {
//     eyebus: {
//         title: "Eyebus",
//         projectComponent: EyebusProject,
//     },
//     walkingvibe: {
//         title: "WalkingVibe",
//         projectComponent: WalkingVibe,
//     }
// }

export const projectMetaData = [
    {
        projectIcon: 'https://carolyn-yu.com/images/reddotlogo.png',
        projectTitle: 'EyeBus',
        projectDescription: 'A Bus Reservation Service for People with Visual Impairments in Taipei.',
        preImg: 'https://carolyn-yu.com/images/eyebusCover.png',
        tags: ['UX','Mobile','Accessibility','Usability Testing','Sketch','Xcode'],
        themeColor: '#F1EFED',
        coverImg: 'https://carolyn-yu.com/images/eyebusCoverImg.png',
        id: "eyebus",
        projectComponent: EyebusProject,
    },
    {
        projectIcon: 'https://carolyn-yu.com/images/chi2020logo.png',
        projectTitle: 'WalkingVibe',
        projectDescription: 'Reducing Virtual Reality Sickness and Improving Realism while Walking in VR using Unobtrusive Head-mounted Vibrotactile Feedback.',
        preImg: 'https://carolyn-yu.com/images/walkingvibeCover.png',
        tags: ['UX','Virtual Reality (VR)','Prototyping','C#','Arduino'],
        themeColor: '#E5ECF7',
        coverImg: 'https://carolyn-yu.com/images/walkingvibeCover.png',
        id: "walkingvibe",
        projectComponent: WalkingVibe,
    }
]
