import { withStyles, Theme, createStyles, Card } from "@material-ui/core";

const GamePreviewCard = withStyles((theme: Theme) => {
    createStyles({
        card: {
            width: "240px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: theme.spacing(2),
        },
    });
})(Card);

export default GamePreviewCard;
