import React from 'react';
import { Form } from '../components';

interface ISearchFormContainer {
  search: string;
  setSearch: (search: string) => void;
}

export const SearchFormContainer: React.FC<ISearchFormContainer> = React.memo(
  (props) => {
    const { search, setSearch } = props;
    return (
      <Form size='search'>
        <Form.Title>Search By Name</Form.Title>
        <Form.BaseForm>
          <Form.InputsGroup>
            <Form.InputLabel htmlFor='search'>Search name:</Form.InputLabel>
            <Form.Input
              type='text'
              name='search'
              id='search'
              value={search}
              placeholder='Enter search text'
              onChange={(e) => setSearch(e.currentTarget.value)}
              onKeyDown={(e) => setSearch(e.currentTarget.value)}
            />
          </Form.InputsGroup>
        </Form.BaseForm>
      </Form>
    );
  }
);
