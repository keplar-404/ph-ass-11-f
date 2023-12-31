import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../../../lib/axios";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import { UserContext } from "../../layout/MainLayout";

export default function BooksList() {
  const location = useLocation();
  const categoryName = location.state.toLowerCase();
  const [books, setBooks] = useState("loading");
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const getBooks = () => {
    setLoading(true);
    axios
      .post("/getbycategory", { category: categoryName })
      .then((data) => {
        const booksData = data.data;
        setBooks(booksData);
      })
      .catch((err) => {
        setBooks(null);
      });
  };

  useLayoutEffect(() => {
    if (userData == null) {
      navigate("/authentication");
    } else {
      getBooks();
    }
  }, []);

  if (books === null) {
    return (
      <>
        <div className="bg-white w-full h-screen flex justify-center items-center">
          <p className="text-[3rem] font-medium">NO books found</p>
        </div>
      </>
    );
  } else if (books === "loading") {
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
      <>
        <div>
          <CssBaseline />
          <div>
            <Container sx={{ py: 8 }} maxWidth="md">
              {/* End hero unit */}
              <Grid container spacing={4}>
                {books.map((data, index) => (
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
                        <Typography>Author Name: {data.authorName}</Typography>
                        <Typography>Category: {data.category}</Typography>
                        <Typography>Rating: {data.rating[0]}</Typography>
                        <Typography>Quentity: {data.quantity}</Typography>
                        <Link
                          to={`/category/${data.category}/${data.name}`}
                          state={data}
                        >
                          <Button variant="contained">Details</Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </div>
        </div>
      </>
    );
  }
}
