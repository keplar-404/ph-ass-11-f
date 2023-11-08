import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const products = [
  {
    name: "The Young Adult's Guide to Selling Your Art, Music, Writing, Photography",
    img: "https://images.booksense.com/images/777/231/9781620231777.jpg",
    price: "1200",
    rating: 5,
  },
  {
    name: "Common sense investing",
    img: "https://www.thebalancemoney.com/thmb/y-DTuAd1fGmEIfUbpJHiQQfokNU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Webp.net-resizeimage10-a97f8d2037c147fcad4d2340c8639e46.jpg",
    price: "2500",
    rating: 5,
  },
  {
    name: "The intelligent investor",
    img: "https://m.media-amazon.com/images/I/51Xur1KZWKL._SR290,290_.jpg",
    price: "980",
    rating: 5,
  },
];

export default function TopBooks() {
  return (
    <div>
      <CssBaseline />
      <div>
        <p className="text-center font-bold text-5xl dark:text-white text-black mt-16">
          Top rated books
        </p>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {products.map((data, index) => (
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
                    image={data.img}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {data.name}
                    </Typography>
                    <Typography>Price: ${data.price}</Typography>
                    <Typography>Rating: {data.rating}</Typography>
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
