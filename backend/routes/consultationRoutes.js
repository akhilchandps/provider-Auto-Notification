const express = require('express');
const { bookConsultation, getConsultations, sendReminders, resheduleConsultation, markConsultation, updateConsultation, consultationSummary, cancelConsultation, uploadPatientdoc } = require('../controllers/consultationController');
const router = express.Router();
const multer = require("multer");


// Configure Multer to store files in memory

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
});


//Book a consultation for a patient

// book Consultation

router.post('/',bookConsultation)

//get all consultations

router.get('/',getConsultations)


//Send reminders for upcoming consultations

router.get('/reminder',sendReminders)


//Reshedule consultation

router.put('/:id',resheduleConsultation)


//Mark a consultation as missed

router.put("/missed/:consultationId", markConsultation)


//Upload a patient document to S3 and notify the provider

router.post("/upload",upload.single("document"),uploadPatientdoc)

//Update Consultation Status to Completed

router.put("/:consultation_id/status",updateConsultation)

//Get consultation summary for a provider on a given date.

router.get("/consultation-summary/:provider_id/:date",consultationSummary)


//Delete or Cancel Consultation
router.delete('/:id',cancelConsultation)


module.exports = router;
