// src/App.tsx
import React, { useState } from "react";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";

const App: React.FC = () => {
  const [name, setName] = useState("Muhamad Luthfi Sadli");
  const [address, setAddress] = useState(
    "Jl. Mandiri No. 22, Cipondoh, Tangerang"
  );
  const [email, setEmail] = useState("luthfisadli1806@gmail.com");
  const [phone, setPhone] = useState("89697491160");
  const [HRD, setHRD] = useState("Bapak/Ibu");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [position, setPosition] = useState("Fullstack Developer");
  const [body, setBody] =
    useState(`Perkenalkan, nama saya ${name}. Saya tertarik untuk melamar posisi ${position} di ${companyName}. Saya memiliki pengalaman selama 4 tahun dalam bidang IT yang saya peroleh dari pendidikan di SMK dan kuliah.
Selama perjalanan belajar saya, saya pernah mengikuti event IDCamp untuk bootcamp Dicoding dan terpilih hingga tingkat Expert pada kelas React. Saya juga memiliki pengalaman dalam pengembangan aplikasi mobile menggunakan React Native versi 0.73. Di bidang database, saya familiar dengan penggunaan MySQL, PostgreSQL, dan MongoDB. Untuk pengembangan backend, saya lebih sering menggunakan Express.js dan juga memiliki pengalaman dengan Python dan Go untuk membuat REST API sederhana.
Saya terbiasa bekerja dalam tim untuk semua proyek yang saya kerjakan dan cepat dalam memahami materi baru, berkat pengalaman belajar otodidak yang saya jalani.
Sebagai bahan pertimbangan, berikut adalah portofolio saya yang dapat diakses melalui tautan berikut: https://portofolio-react-ts.vercel.app/.`);

  const handleGenerateDoc = () => {
    if (
      !name ||
      !address ||
      !email ||
      !phone ||
      !HRD ||
      !companyName ||
      !position ||
      !body ||
      isNaN(Number(phone))
    ) {
      return;
    }
    const lines = body.split("\n");
    const paragraphsEmpty = new Paragraph({
      children: [
        new TextRun({
          text: " ", // Add a space to apply the formatting
          size: 24, // 24 half-points = 12 points in font size
        }),
      ],
    });

    const bodyParagraphs =
      lines.length > 0
        ? lines
            .map((line) => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: line, // Remove extra spaces
                    size: 24, // Font size in half-points, 24 = 12px
                  }),
                ],
              }),
              paragraphsEmpty,
            ])
            .flat()
        : [];

    const date = new Date().toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // Initialize the document with an options object
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: name,
                  size: 24, // 12px size
                  bold: true, // Optional: make it bold
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: address,
                  size: 24, // 12px size
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: email,
                  size: 24, // 12px size
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `(+62)${phone}`,
                  size: 24, // 12px size
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: date,
                  size: 24, // 12px size
                }),
              ],
            }),
            paragraphsEmpty,
            new Paragraph({
              children: [
                new TextRun({
                  text: `Yth. ${HRD}, HRD,`,
                  size: 24, // 12px size
                  bold: true, // Optional: make it bold
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: companyName,
                  size: 24, // 12px size
                }),
              ],
            }),
            ...(companyAddress
              ? [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: companyAddress,
                        size: 24, // 12px size
                      }),
                    ],
                  }),
                ]
              : []),
            paragraphsEmpty,
            new Paragraph({
              children: [
                new TextRun({
                  text: "Dengan hormat,",
                  size: 24, // 12px size
                }),
              ],
            }),
            paragraphsEmpty,
            // new Paragraph({
            //   children: [
            //     new TextRun({
            //       text: body,
            //       size: 24, // 12px size
            //     }),
            //   ],
            // }),
            ...bodyParagraphs,
            new Paragraph({
              children: [
                new TextRun({
                  text: `Saya berharap dapat berdiskusi lebih lanjut mengenai peluang yang ada. Terima kasih atas perhatian ${HRD}.`,
                  size: 24, // 12px size
                }),
              ],
            }),
            paragraphsEmpty,
            new Paragraph({
              children: [
                new TextRun({
                  text: `Hormat saya,`,
                  size: 24, // 12px size
                }),
              ],
            }),
            paragraphsEmpty,
            new Paragraph({
              children: [
                new TextRun({
                  text: name,
                  size: 24, // 12px size
                }),
              ],
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `CoverLetter-${name}.docx`);
    });
  };

  const isRequired = (value: string) => value.trim() === "";

  const isRequiredNumber = (value: string) => {
    return value.trim() === "" || isNaN(Number(value));
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Cover Letter Generator
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGenerateDoc();
        }}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Nama Pelamar *"
            variant="filled"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={isRequired(name)}
            helperText={isRequired(name) && "Nama Pelamar tidak boleh kosong."}
          />
          <TextField
            label="Alamat Pelamar *"
            variant="filled"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            error={isRequired(address)}
            helperText={
              isRequired(address) && "Alamat Pelamar tidak boleh kosong."
            }
          />
          <TextField
            label="Email Pelamar *"
            variant="filled"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={isRequired(email)}
            helperText={
              isRequired(email) && "Email Pelamar tidak boleh kosong."
            }
          />
          <TextField
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">+62</InputAdornment>
                ),
              },
            }}
            label="No. Handphone Pelamar *"
            type="tel"
            variant="filled"
            fullWidth
            value={phone}
            onChange={(e) => {
              const inputValue = e.target.value;
              const cleanedInput = inputValue.replace(/^0+/, ""); // Remove leading zeros
              setPhone(cleanedInput);
            }}
            error={isRequiredNumber(phone)}
            helperText={
              isRequiredNumber(phone) && "No. Handphone Pelamar tidak valid."
            }
          />
          <TextField
            label="Nama HR *"
            variant="filled"
            fullWidth
            value={HRD}
            onChange={(e) => setHRD(e.target.value)}
            error={isRequired(HRD)}
            helperText={isRequired(HRD) && "Nama HR tidak boleh kosong."}
          />
          <TextField
            label="Nama Perusahaan *"
            variant="filled"
            fullWidth
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            error={isRequired(companyName)}
            helperText={
              isRequired(companyName) && "Nama Perusahaan tidak boleh kosong."
            }
          />
          <TextField
            label="Alamat Perusahaan"
            variant="filled"
            fullWidth
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
          />
          <TextField
            label="Posisi yang Dilamar *"
            variant="filled"
            fullWidth
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            error={isRequired(position)}
            helperText={
              isRequired(position) && "Posisi yang Dilamar tidak boleh kosong."
            }
          />
          <TextField
            label="Body *"
            variant="filled"
            fullWidth
            multiline
            minRows={6}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            error={isRequired(body)}
            helperText={isRequired(body) && "Body tidak boleh kosong."}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Generate Cover Letter
          </Button>
        </Box>
      </form>
      <Typography variant="body2" align="center" sx={{ mt: 4 }}>
        © 2024 Muhamad Luthfi Sadli
      </Typography>
    </Container>
  );
};

export default App;
