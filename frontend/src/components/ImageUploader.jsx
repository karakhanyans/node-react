import React, {Component} from 'react';
import Button from "@material-ui/core/Button/Button";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CardMedia from "@material-ui/core/CardMedia/CardMedia";

class ImageUploader extends Component {
    state = {};
    saveImage = this.props.saveImage.bind(this);

    // Handle file change
    handleFileChange = (e) => {
        const allowedImageTypes = ['image/jpeg', 'image/png'];
        const file = e.target.files[0];
        this.saveImage(file);
        if (typeof file !== "undefined" && allowedImageTypes.indexOf(file.type) >= 0) {
            this.readFile(file);
        }
    };

    // Read file data
    readFile = (file) => {
        let url = URL.createObjectURL(file);
        this.setState({
            url: url
        })
    };

    render() {
        const {classes, value, buttonColor} = this.props;
        return (
            <div>
                <input
                    accept="image/*"
                    className={classes.input}
                    style={{display: 'none'}}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={this.handleFileChange}
                />
                <label htmlFor="raised-button-file">
                    <Button variant="contained" component="span" color={buttonColor ? buttonColor : 'primary'}
                            className={classes.button}>
                        {value ? value : 'Upload Picture'}
                        <CloudUploadIcon className={classes.rightIcon}/>
                    </Button>
                </label>
                {this.state.url ? <CardMedia
                    className={classes.media}
                    image={this.state.url}
                    id="preview"
                /> : ""}
            </div>
        )
    }
}

export default ImageUploader;