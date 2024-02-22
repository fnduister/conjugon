import { Box } from "@mui/material";
import styled from "styled-components";

interface SortableItemBox {
  showresult: boolean;
  correction: string;
}

export const ItemBox = styled(Box) <SortableItemBox>`
    background-color : ${props => props.showresult ? props.correction : "white"};
    transition: background-color .5s ease-in;
    }`