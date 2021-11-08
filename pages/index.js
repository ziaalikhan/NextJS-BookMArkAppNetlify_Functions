import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import UserCards from '../components/UserCards';
import {BOOKMARKDATA} from '../Graphql/query';
import {ADD_bOOKMARK} from '../Graphql/mutation';
import Loading from '../components/Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    button: {
      margin: theme.spacing(3),
    },
  },
}));




function HomeIndex() {
  const classes = useStyles();

  const [task, settask] = useState("");
  const [url, seturl] = useState("");

  const { loading, error, data } = useQuery(BOOKMARKDATA);

  console.log(data);
  const [addBookMark] = useMutation(ADD_bOOKMARK);


  const inputHandler = () => {
    if ((task, url)) {
      addBookMark({
        variables: {
          task: task,
          url: url,
        },
        refetchQueries: [{ query: BOOKMARKDATA }],
      });
      // if the input will be Empty then Alert will be shown
    } else {
      alert("The Inputs Values Are Empty Please Fill It First!");
    }
    // after the data is send to database input will be empty
    settask("");
    seturl("");
  };


  // Loader Start

  if (loading) {
    return <Loading />;
  }

  // Error Start
  if (error) {
    return <h2>Error...</h2>;
  }
  return (
    <div>
      <div className="heading">
        <h2>BookMark App</h2>
      </div>
      <div className="main_container">
        <form>
          <input
            value={task}
            onChange={(e) => settask(e.target.value)}
            placeholder="Task"
            className="inputSearch"
            type="text"
          />
        </form>
        <form>
          <input
            value={url}
            onChange={(e) => seturl(e.target.value)}
            placeholder="Url"
            className="inputSearch"
            type="text"
          />
        </form>
        {/* <form className={classes.root} noValidate autoComplete="off">
          <TextField
           
          id="outlined-basic" label="Task" variant="outlined" />
        </form>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField 
         }
          id="outlined-basic" label="Url" variant="outlined" />
        </form> */}
        <Button
          variant="contained"
          color="primary"
          onClick={inputHandler}
          className={classes.button}
          endIcon={<SendIcon>Send</SendIcon>}
        >
          Send
        </Button>
      </div>

      <div className="main_card">
        {data?.bookmarks.map((val, id) => {
          return (
            <UserCards 
            key={val.id}
            id={val.id}
            task={val.task}
            url={val.url}
            />
            // <div className="card" key={id}>
            //   <div className="deleteBtn">
            //     <h2 onClick={() => delteBtn(id)}>X</h2>
            //   </div>
            //   <h4>Task: {val.task}</h4>
            //   <h4>Url: {val.url}</h4>
            // </div>
          );
        })}
      </div>
    </div>
  );
}
export default HomeIndex;
