import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../layout/MainLayout";
import { useContext, useLayoutEffect, useRef, useState } from "react";
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
import axios from "../../lib/axios";

let initialBooks = [];
export default function AllBooks() {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    if (userData == null) {
      navigate("/authentication");
    } else {
      setLoading(true);
      axios.get("/getall").then((data) => {
        initialBooks = data.data;
        setAllBooks(data.data);
        setLoading(false);
      });
    }
  }, []);

  //  const handleUpdate = () => {
  //   navigate('/updateform')
  //  }

  const [selectedValue, setSelectedValue] = useState("all");
  // console.log(selectedValue)
  const handleRadioChange = (value) => {
    setSelectedValue(value);
    if (value == "quantity") {
      const fileredBooks = allBooks.filter((data) => data.quantity > 0);
      setAllBooks(fileredBooks);
    } else if (value == "all") {
      setAllBooks(initialBooks);
    }
  };

  if (loading === true) {
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
  } else if (loading === false) {
    return (
      <div>
        <CssBaseline />
        <div>
          <p className="text-center font-bold text-5xl dark:text-white text-black mt-16">
            All books
          </p>
          {/* filter */}

          <div className="w-full flex justify-center items-center gap-4 mt-4 text-lg">
            <label>
              <input
                type="radio"
                value="all"
                checked={selectedValue === "all"}
                onChange={() => handleRadioChange("all")}
              />
              All
            </label>

            <label>
              <input
                type="radio"
                value="quantity"
                checked={selectedValue === "quantity"}
                onChange={() => handleRadioChange("quantity")}
              />
              Quantity
            </label>
          </div>

          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {allBooks.map((data, index) => (
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
                      image={data.images}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {data.name}
                      </Typography>
                      <Typography>Author name: {data.authorName}</Typography>
                      <Typography>Category: {data.category}</Typography>
                      <Typography>Rating: {data.rating[0]}</Typography>
                      <Link to={"/updateform"} state={data}>
                        <Button variant="contained">Update</Button>
                      </Link>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
      </div>
    );
  }
}
