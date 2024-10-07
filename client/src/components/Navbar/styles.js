import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: "30px 0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
    },
    heading: {
        color: "rgba(0,183,255, 1)",
        textDecoration: "none",
    },
    image: {
        marginLeft: "20px",
    },
    toolbar: {
        display: "flex",
        justifyContent: "flex-end",
        width: "500px",
    },
    profile: {
        display: "flex",
        justifyContent: "space-between",
        width: "250px",
    },
    userName: {
        display: "flex",
        alignItems: "center",
    },
    brandContainer: {
        display: "flex",
        alignItems: "center",
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    }));