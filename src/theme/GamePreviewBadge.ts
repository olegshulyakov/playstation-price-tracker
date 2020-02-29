import { withStyles, Theme, createStyles, Badge } from "@material-ui/core";

const GamePreviewBadge = withStyles((theme: Theme) =>
    createStyles({
        badge: {
            right: 48,
            bottom: 16,
            fontSize: "0.9rem",
            backgroundColor: theme.palette.background.paper,
        },
    }),
)(Badge);

export default GamePreviewBadge;
