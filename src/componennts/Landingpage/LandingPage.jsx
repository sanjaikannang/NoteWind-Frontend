import React from "react";
import { Container, Button, Typography, Grid, Divider } from "@mui/material";
import { useNavigate } from "react-router";
import Base from "../base/Base";

const LandingPage = () => {
  const Navigate = useNavigate();

  return (
    <>
      <Base>
        <Container
          style={{
            position: "relative",
            padding: 0,
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid container>
            {/* Left Column (Image) */}
            <Grid item xs={12} md={6}>
              <div
                style={{
                  height: "140%",
                  backgroundImage: "url(/images/9936453_4317222.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </Grid>

            {/* Right Column (Content and Button) */}
            <Grid item xs={12} md={6}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "2rem",
                  textAlign: "center",
                  color: "black", // Adjust text color
                }}
              >
                <br />
                <br />
                <Typography variant="h3" sx={{ marginBottom: 2 }}>
                  Welcome to NoteWind!!
                </Typography>
                <br />
                <Typography variant="h4" sx={{ marginBottom: 4 }}>
                  Your Ultimate Note-Taking Experience
                </Typography>
                <br />
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#00BFA5",
                    color: "white",
                    padding: "10px 20px",
                    fontSize: "14px",
                    borderRadius: "25px",
                  }}
                  onClick={() => Navigate("/Login")}
                >
                  Get Started
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>

        {/* Additional Content Section 1 */}
        <Container
          style={{
            position: "relative",
            padding: 0,
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid container style={{ marginTop: "3rem" }}>
            {/* Left Column (Image) */}
            <Grid item xs={12} md={6}>
              <div
                style={{
                  height: "120%",
                  backgroundImage: "url(/images/2ndimage.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </Grid>

            {/* Right Column (Content) */}
            <Grid item xs={12} md={6}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "2rem",
                  textAlign: "center",
                  color: "black", // Adjust text color
                }}
              >
                <br />
                <Typography variant="h4" sx={{ marginBottom: 2 }}>
                  Stop writing notes on paper, use digital notes!
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 4 }}>
                  Embrace the power of digital note-taking with NoteWind. Say
                  goodbye to the hassle of carrying paper and start organizing
                  your thoughts digitally.
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 4 }}>
                  With NoteWind, you're not just going paperless; you're
                  stressless. Simplify your life, declutter your space, and
                  enjoy the freedom of a minimalist, digital note-taking
                  experience.
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Container>

        <Container
          style={{
            position: "relative",
            padding: 0,
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid container style={{ marginTop: "3rem" }}>
            {/* Left Column (Content) */}
            <Grid item xs={12} md={6}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "2rem",
                  textAlign: "center",
                  color: "black", // Adjust text color
                }}
              >
                <Typography variant="h4" sx={{ marginBottom: 2 }}>
                  Revolutionize your note-taking experience!
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 4 }}>
                  With NoteWind, take your note-taking to the next level. Enjoy
                  seamless organization, collaboration, and accessibility in the
                  digital world.
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 4 }}>
                  Embrace a new level of creativity with digital notes. Draw,
                  sketch, and annotate effortlessly. With a variety of tools at
                  your fingertips, express your ideas in ways that go beyond the
                  limitations of traditional paper.
                </Typography>
              </div>
            </Grid>

            {/* Right Column (Image) */}
            <Grid item xs={12} md={6}>
              <div
                style={{
                  height: "140%",
                  backgroundImage: "url(/images/3rdimage.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </Grid>
          </Grid>
        </Container>
        <br />
        <br />

        <Divider flexItem />

        {/* Copyright Section */}
        <Container style={{ marginTop: "3rem", textAlign: "center" }}>
          <Typography variant="body3" sx={{ color: "black" }}>
            &copy; 2023 " NoteWind ". All rights reserved.
          </Typography>
          <br />
          <br />
          <Typography variant="body2" sx={{ color: "black" }}>
            Digital Millennium Copyright Act (DMCA) Compliance:
          </Typography>
          <Typography variant="body2" sx={{ color: "black" }}>
            NoteWind complies with the DMCA. If you are a copyright owner or an
            agent thereof and believe that any content on NoteWind infringes
            upon your copyright, please submit a DMCA notice to our designated
            agent.
          </Typography>
          <br />
          <br />
        </Container>
      </Base>
    </>
  );
};

export default LandingPage;
