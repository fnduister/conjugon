import { Breadcrumbs, Container } from '@mui/material';
import React, { Fragment } from 'react'
import { useMatches } from 'react-router-dom';
import BreadCrumbsItem from './BreadCrumbsItem';

interface PregameBread {
  name: string;
  path: string;
  index: number;
}

const PregameBreadCumb = ({ name, path, index }: PregameBread) => {
  return <Fragment key={index}>
    <BreadCrumbsItem name={name} path="path" key={index} />
    <BreadCrumbsItem name=" > pre-game" path="/pregame" key={index} />
  </Fragment>
}

const MyBreadcrumbs = () => {
  let matches = useMatches();
  let crumbs = matches
    // first get rid of any matches that don't have handle and crumb
    .filter((match) => match.handle !== undefined)
    // now map them into an array of elements, passing the loader
    // data to each one
    .map((match) => (match.handle as any).crumb);

  return (
    <Container sx={{ display: 'flex', mb: 1, mt: 1 }} maxWidth="xl">
      <Breadcrumbs separator="›" aria-label="breadcrumb">

        {crumbs.map((crumb, index) => {

          console.log('🚀 ~ {crumbs.map ~ crumb', crumb);
          return <BreadCrumbsItem name={crumb.name} path={crumb.path} key={index} />
        }
        )}
      </Breadcrumbs>
    </Container>
  );
}

export default MyBreadcrumbs