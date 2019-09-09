import { DocumentUpload } from "./components/DocumentUpload";
import { DocumentsList } from "./components";

class DocumentsRegistration extends Comment {
    render() {
        return (
            <DashboardLayout>
                <div className={classes.root}>

                    <DocumentUpload />
                    <DocumentsList />

                </div>
            </DashboardLayout>
        );
    };
};

export default withStyles(styles)(DocumentsRegistration);