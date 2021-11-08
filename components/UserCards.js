import React from 'react'
import {useMutation } from "@apollo/client";
import {DELETE_BOOKMARK} from '../Graphql/mutation';
import {BOOKMARKDATA} from '../Graphql/query';



export default function UserCards({ id, url, task }) {

    const [deleteTodo] = useMutation(DELETE_BOOKMARK);

    const delteBtn = (id) => {
        deleteTodo({
          variables: {
            id: id,
          },
          refetchQueries: [{ query: BOOKMARKDATA }],
        });
      };
    


    return (
         <div className="card" key={id}>
              <div className="deleteBtn">
                <h2 onClick={() => delteBtn(id)}>X</h2>
              </div>
              <h4>Task: {task}</h4>
              <h4>Url: {url}</h4>
            </div>
    )
}
