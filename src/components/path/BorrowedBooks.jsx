import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "../../lib/axios";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { UserContext } from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";

export default function BorrowedBooks() {
  const [allBooks, setAllBooks] = useState("loading");
  const { userData, setUserData } = React.useContext(UserContext);
  const navigate = useNavigate();

  const borrowBooks = () => {
    axios
      .get("/getallb")
      .then((data) => {
        console.log(data.data);
        setAllBooks(data.data);
      })
      .catch((err) => console.log(err));
  };
  // chech if use is there
  useLayoutEffect(() => {
    if (userData == null) {
      navigate("/authentication");
    } else {
      borrowBooks();
    }
  }, []);
  console.log(userData);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const funDate = (date) => {
    const _date = new Date(date);
    const h_date = _date.toLocaleDateString("en-US", options);
    return h_date;
  };

  const retunHandle = (e, id, name) => {
    e.preventDefault();
    console.log(id, name);
    axios
      .post("/return", { id: id, name: name })
      .then((data) => {
        toast.success("Returned Successfully");
        borrowBooks();
      })
      .catch((err) => console.log(err));
  };

  // console.log(allBooks);

  if (allBooks == "loading") {
    return (
      <>
        <div className="w-full h-screen flex justify-center items-center">
          <p className="dark:bg-gray-800 bg-white dark:text-white text-black font-bold text-3xl">
            Please wait for 20 seconds. We are loading and delivering your
            content
          </p>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <CssBaseline />
        <div>
          <p className="text-center font-bold text-5xl dark:text-white text-black mt-16">
            Borrowed Books
          </p>
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {allBooks.length !== 0 ? (
                allBooks.map((data, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "4.5%",
                      }}
                    >
                      <CardMedia
                        component="div"
                        sx={{
                          // 16:9
                          pt: "56.25%",
                        }}
                        image={data.images[0]}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {data.name}
                        </Typography>

                        <Typography>Category: {data.category}</Typography>
                        <Typography>
                          Borrowed Date: {funDate(data.borrowedDate)}
                        </Typography>
                        <Typography>
                          Returned Date: {funDate(data.borrowedDate)}
                        </Typography>

                        <Button
                          variant="contained"
                          onClick={(e) => retunHandle(e, data._id, data.name)}
                        >
                          Return
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                <div className="w-full h-screen flex justify-center items-center">
                  <p className="dark:bg-gray-800 bg-white dark:text-white text-black font-bold text-3xl">
                    You have not borrow any book yet
                  </p>
                </div>
              )}
            </Grid>
          </Container>
        </div>
      </div>
    );
  }
}
