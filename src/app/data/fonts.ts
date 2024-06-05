import { 
    Sono,
    Open_Sans,
    Sofia_Sans,
    Sofia_Sans_Condensed,
    Sofia_Sans_Semi_Condensed,
    Sofia_Sans_Extra_Condensed
} from "next/font/google"

export const sono = Sono({ subsets: ["latin"] })
export const sonoLight = Sono({ subsets: ["latin"], weight: "300" })
export const openSans = Open_Sans({ subsets: ["latin"] })
export const sofiaSans = Sofia_Sans({ subsets: ["latin"] })
export const sofiaSansCondensed = Sofia_Sans_Condensed({ subsets: ["latin"] })
export const sofiaSansSemiCondensed = Sofia_Sans_Semi_Condensed({ subsets: ["latin"] })
export const sofiaSansExtraCondensed = Sofia_Sans_Extra_Condensed({ subsets: ["latin"] })