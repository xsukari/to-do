import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"


export default function Home() {
    return (
        <main className="flex min-h-[1178px] min-w-[833px] max-h-[1180px] max-w-[833px] m-auto">
            <div className="w-full bg-[#3b9aad]">
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ArrowDownwardIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography>Accordion 1</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </main>
    )
}
