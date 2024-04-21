import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Grid from '@mui/material/Grid';

function AboutUs() {

    const imgStyle = {
        width: '200px', 
        height: '200px', 
        objectFit: 'cover', 
    };

    const captionStyle = {
        textAlign: 'center', 
        color: 'white', 
    };
    
    return (
        <div className="row justify-content-center">
            <Grid container spacing={4}>
                <Grid item xs={1}/>
                <Grid item xs={3}>
                    <div className="row justify-content-end">
                        <div className="logo-img" style={imgStyle}>
                            <img src={require("../images/coin.gif")} alt="Adriel" className="logo-img" style={imgStyle}/>
                            <figcaption style={captionStyle}>Adriel</figcaption>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className="row justify-content-center">
                        <div className="logo-img" style={imgStyle}>
                            <img src={require("../images/alyssa.png")} alt="Alyssa" className="logo-img" style={imgStyle}/>
                            <figcaption style={captionStyle}>Alyssa</figcaption>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className="row justify-content-start">
                        <div className="logo-img" style={imgStyle}>
                            <img src={require("../images/gabe.png")} alt="Gabe" className="logo-img" style={imgStyle}/>
                            <figcaption style={captionStyle}>Gabe</figcaption>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={1}/>
                <Grid item xs={1}/>
                <Grid item xs={3}>
                    <div className="row justify-content-end">
                        <div className="logo-img" style={imgStyle}>
                            <img src={require("../images/lenny.jpg")} alt="Lenny" className="logo-img" style={imgStyle}/>
                            <figcaption style={captionStyle}>Lenny</figcaption>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className="row justify-content-center">
                        <div className="logo-img" style={imgStyle}>
                            <img src={require("../images/logan.png")} alt="Logan" className="logo-img" style={imgStyle}/>
                            <figcaption style={captionStyle}>Logan</figcaption>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className="row justify-content-start">
                        <div className="logo-img" style={imgStyle}>
                            <img src={require("../images/matt.png")} alt="Matt" className="logo-img" style={imgStyle}/>
                            <figcaption style={captionStyle}>Matt</figcaption>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={1}/>
            </Grid>
        </div>
    );
}

export default AboutUs;
