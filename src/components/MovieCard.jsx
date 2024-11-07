import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IMG_URL } from "../hooks/useEnv";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ item }) {
  const navigate = useNavigate()
  const {likedList, setLikedList} = React.useContext(Context)

  function handleLikeBtnClick() {
    const likeData = likedList.findIndex(value => value.id == item.id)
    if (likeData == -1) {
      setLikedList([...likedList, item])
    }else {
      likedList.splice(likeData, 1)
      setLikedList([...likedList])
    }
  }

  return (
    <Card  className="cursor-pointer" sx={{ maxWidth: 345, borderRadius:"10px" }}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            <CardMedia
              className="!w-[50px] h-[50px]"
              component="img"
              image={`${IMG_URL}/${item.backdrop_path}`}
              alt={item.title}
            />
          </Avatar>
        }
        title={<h2 className="line-clamp-1">{item.title}</h2>}
        subheader={item.release_date}
      />
      <CardMedia
      onClick={() => navigate(`/movie/${item.id}`)}
      className="h-[350px]"
        component="img"
        height="194"
        image={`${IMG_URL}/${item.poster_path}`}
        alt="Paella dish"
      />
      <CardContent>
        <Typography className="line-clamp-3" variant="body2" sx={{ color: "text.secondary" }}>
        {item.overview}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleLikeBtnClick} aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
            <BookmarkIcon/>
        </IconButton>
      </CardActions>
    </Card>
  );
}
