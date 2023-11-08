import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import TopBooks from "../shared/TopBooks";
import Testimonial from "../shared/Testimonial";
import { Link } from "react-router-dom";

export default function Home() {
  const products = [
    {
      name: "Art, Music & Photography",
      img: "/art.webp",
    },
    {
      name: "Comic Books & Graphic Novels",
      img: "https://i0.wp.com/ageekgirlsguide.com/wp-content/uploads/2015/07/gn-v-cb.jpg?fit=2470%2C2000&ssl=1",
    },
    {
      name: "Computers & Technology",
      img: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1642012272i/60111427.jpg",
    },
    {
      name: "Business & Investing",
      img: "https://i-invdn-com.investing.com/akapi-images/366def5ec6b7dce826fa081c6f1327b8.png",
    },
  ];
  return (
    <>
      {/* slider */}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className="h-[500px] w-screen"
      >
        <SwiperSlide className="w-full h-full">
          <img src="/eBooks.jpg" alt="banner" className="w-full h-full" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/famous.png" alt="banner" className="w-full h-full" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/famous1.png" alt="banner" className="w-full h-full" />
        </SwiperSlide>
      </Swiper>

      {/* category */}
      <div>
        <CssBaseline />
        <div>
          <p className="text-center font-bold text-5xl dark:text-white text-black mt-16">
            Category
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
                      <Link to={`/category/${data.name}`} state={data.name}>
                      <Button variant="contained">See all books</Button>
                      </Link>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
      </div>

      <TopBooks/>
      <Testimonial/>
    </>
  );
}
