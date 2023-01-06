import { Breadcrumbs, Container } from '@mui/material';
import React from 'react'
import { useMatches } from 'react-router-dom';
import BreadCrumbsItem from './BreadCrumbsItem';

const MyBreadcrumbs = () => {
    let matches = useMatches();
    let crumbs = matches
        // first get rid of any matches that don't have handle and crumb
        .filter((match) => match.handle !== undefined)
        // now map them into an array of elements, passing the loader
        // data to each one
        .map((match) => (match.handle as any).crumb);

    return (
        <Container sx={{display: 'flex', mb: 1, mt: 1}} maxWidth="xl">
            <Breadcrumbs separator="›" aria-label="breadcrumb">

                {crumbs.map((crumb, index) => (
                    <BreadCrumbsItem name={crumb.name} path={crumb.path} key={index} />
                ))}
            </Breadcrumbs>
        </Container>
    );
}

export default MyBreadcrumbs