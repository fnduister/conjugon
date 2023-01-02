import {Typography, Link} from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom';

interface Props {
    name: string;
    path: string;
}

const BreadCrumbsItem = ({ name, path }: Props) => {
    return (
        <Link component={RouterLink} underline="hover" color="inherit" to={path}>{name}</Link>
    )
}

export default BreadCrumbsItem