const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const Food = require("../../../models/food");
const History = require("../../../models/history");
const Job = require("../../../models/job");
const Application = require("../../../models/application");
const AuthOtp = require("../../../models/authOtp");

const nodemailer = require("nodemailer");

require("dotenv").config();

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    res.set("Access-Control-Allow-Origin", "*");
    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "Invalid username or password",
      });
    }
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "Sign In Successful, here is your token, please keep it safe",
      data: {
        token: jwt.sign(user.toJSON(), "caloriesapp", { expiresIn: "100000" }),
        user: user,
      },
      success: true,
    });
  } catch (err) {
    console.log("*******", err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.createHistory = async function (req, res) {
  try {
    let history = await History.create({
      date: req.body.date,
      caloriesgain: req.body.total,
      caloriesburn: req.body.burnout,
      user: req.body.id,
    });

    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "History Created Successfully",

      data: {
        history: history,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

// module.exports.signUp = async function (req, res) {
//   try {
//     if (req.body.password != req.body.confirm_password) {
//       return res.json(422, {
//         message: "Passwords donot match",
//       });
//     }

//     User.findOne({ email: req.body.email }, function (err, user) {
//       if (user) {
//         res.set("Access-Control-Allow-Origin", "*");
//         return res.json(200, {
//           message: "Sign Up Successful, here is your token, plz keep it safe",

//           data: {
//             //user.JSON() part gets encrypted

//             token: jwt.sign(user.toJSON(), "caloriesapp", {
//               expiresIn: "100000",
//             }),
//             user,
//           },
//           success: true,
//         });
//       }

//       if (!user) {
//         let user = User.create(req.body, function (err, user) {
//           if (err) {
//             return res.json(500, {
//               message: "Internal Server Error",
//             });
//           }

//           // let userr = User.findOne({ email: req.body.email });
//           res.set("Access-Control-Allow-Origin", "*");
//           return res.json(200, {
//             message: "Sign Up Successful, here is your token, plz keep it safe",

//             data: {
//               //user.JSON() part gets encrypted

//               token: jwt.sign(user.toJSON(), "caloriesapp", {
//                 expiresIn: "100000",
//               }),
//               user,
//             },
//             success: true,
//           });
//         });
//       } else {
//         return res.json(500, {
//           message: "Internal Server Error",
//         });
//       }
//     });
//   } catch (err) {
//     console.log(err);

//     return res.json(500, {
//       message: "Internal Server Error",
//     });
//   }
// };

module.exports.signUp = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      return res.json(422, {
        message: "Passwords do not match",
      });
    }

    User.findOne({ email: req.body.email }, function (err, user) {
      if (user) {
        res.set("Access-Control-Allow-Origin", "*");
        return res.json(200, {
          message: "Sign Up Successful, here is your token, please keep it safe",
          data: {
            token: jwt.sign(user.toJSON(), "caloriesapp", {
              expiresIn: "100000",
            }),
            user,
          },
          success: true,
        });
      }

      if (!user) {
        // Convert skills from a comma-separated string to an array of strings if it's provided as a string.
        if (typeof req.body.skills === 'string') {
          req.body.skills = req.body.skills.split(",").map(skill => skill.trim());
        }

        let user = User.create(req.body, function (err, user) {
          if (err) {
            return res.json(500, {
              message: "Internal Server Error",
            });
          }

          res.set("Access-Control-Allow-Origin", "*");
          return res.json(200, {
            message: "Sign Up Successful, here is your token, please keep it safe",
            data: {
              token: jwt.sign(user.toJSON(), "caloriesapp", {
                expiresIn: "100000",
              }),
              user,
            },
            success: true,
          });
        });
      } else {
        return res.json(500, {
          message: "Internal Server Error",
        });
      }
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.getProfile = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "The User info is",

      data: {
        //user.JSON() part gets encrypted

        //token: jwt.sign(user.toJSON(), env.jwt_secret, { expiresIn: "100000" }),
        user: user,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.editProfile = async function (req, res) {
  // if (req.body.password == req.body.confirm_password) {
  try {
    let user = await User.findById(req.body.id);

    user.name = req.body.name;
    user.password = req.body.password;
    user.role = req.body.role;
    user.address = req.body.address;
    user.phonenumber = req.body.phonenumber;
    user.hours = req.body.hours;
    user.availability = req.body.availability;
    user.gender = req.body.gender;
    // user.dob = req.body.dob;
    check = req.body.skills;
    user.skills = check;

    if (typeof req.body.skills === 'string') {
      user.skills = req.body.skills.split(",").map(skill => skill.trim());
    } else {
      user.skills = req.body.skills;
    }

    await user.save();
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "User is updated Successfully",

      data: {
        //user.JSON() part gets encrypted

        // token: jwt.sign(user.toJSON(), env.jwt_secret, {
        //   expiresIn: "100000",
        // }),
        user,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
  // } else {
  //   return res.json(400, {
  //     message: "Bad Request",
  //   });
  // }
};

module.exports.searchUser = async function (req, res) {
  try {
    var regex = new RegExp(req.params.name, "i");

    let users = await Job.find({ name: regex });
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "The list of Searched Users",

      data: {
        //user.JSON() part gets encrypted

        //token: jwt.sign(user.toJSON(), env.jwt_secret, { expiresIn: "100000" }),
        users: users,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.getHistory = async function (req, res) {
  try {
    let history = await History.findOne({
      user: req.query.id,
      date: req.query.date,
    });
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "The User Profile",

      data: {
        //user.JSON() part gets encrypted

        // token: jwt.sign(user.toJSON(), env.jwt_secret, { expiresIn: "100000" }),
        history: history,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.createJob = async function (req, res) {
  let user = await User.findOne({ _id: req.body.id });
  console.log("Incoming skills:", req.body.skills);

  let skills = req.body.skills ? req.body.skills.split(",").map(skill => skill.trim()) : []; // Split skills string into an array
  check = req.body.skills;
  try {
    let job = await Job.create({
      name: req.body.name,
      managerid: user._id,
      managerAffilication: user.affiliation,
      type: req.body.type,
      location: req.body.location,
      skills: skills,
      description: req.body.description,
      pay: req.body.pay,
      question1: req.body.question1,
      question2: req.body.question2,
      question3: req.body.question3,
      question4: req.body.question4,
    });
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      data: {
        job: job,
        //token: jwt.sign(user.toJSON(), env.jwt_secret, { expiresIn: "100000" })
      },
      message: "Job Created!!",
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "NOT CREATED",
    });
  }
};

module.exports.index = async function (req, res) {
  let jobs = await Job.find({}).sort("-createdAt");

  //Whenever we want to send back JSON data
  res.set("Access-Control-Allow-Origin", "*");
  return res.json(200, {
    message: "List of jobs",

    jobs: jobs,
  });
};

module.exports.fetchApplication = async function (req, res) {
  let application = await Application.find({}).sort("-createdAt");

  //Whenever we want to send back JSON data
  res.set("Access-Control-Allow-Origin", "*");
  return res.json(200, {
    message: "List of Applications",

    application: application,
  });
};

module.exports.createApplication = async function (req, res) {
  // let user = await User.findOne({ _id: req.body.id });
  // check = req.body.skills;

  try {
    const existingApplication = await Application.findOne({
      applicantid: req.body.applicantId,
      jobid: req.body.jobId,
    });

    if (existingApplication) {
      res.set("Access-Control-Allow-Origin", "*");
      return res.json(400, {
        message: "You have already applied for the job",
        error: true,
      });
    }

    let application = await Application.create({
      // applicantemail: req.body.applicantemail,
      
      applicantid: req.body.applicantid,
      applicantname: req.body.applicantname,
      applicantemail: req.body.applicantemail,
      applicantskills: req.body.applicantSkills,
      address: req.body.address,
      phonenumber: req.body.phonenumber,
      hours: req.body.hours,
      dob: req.body.dob,
      gender: req.body.gender,
      jobname: req.body.jobname,
      jobid: req.body.jobid,
      managerid: req.body.managerid,
    });
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      data: {
        application: application,
        //token: jwt.sign(user.toJSON(), env.jwt_secret, { expiresIn: "100000" })
      },
      message: "Job Created!!",
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "NOT CREATED",
    });
  }
};

module.exports.modifyApplication = async function (req, res) {
  try {
    let application = await Application.findById(req.body.applicationId);

    application.status = req.body.status;

    //change answer only from screening to grading
    if (req.body.status === "grading") {
      application.answer1 = req.body.answer1;
      application.answer2 = req.body.answer2;
      application.answer3 = req.body.answer3;
      application.answer4 = req.body.answer4;
    }

    if (req.body.status === "rating") {
      application.rating = req.body.rating;
    }
    application.save();
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "Application is updated Successfully",
      data: {
        application,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.acceptApplication = async function (req, res) {
  try {
    let application = await Application.findById(req.body.applicationId);

    application.status = "1";

    application.save();
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "Application is updated Successfully",

      data: {
        //user.JSON() part gets encrypted

        // token: jwt.sign(user.toJSON(), env.jwt_secret, {
        //   expiresIn: "100000",
        // }),
        application,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.rejectApplication = async function (req, res) {
  try {
    let application = await Application.findById(req.body.applicationId);

    application.status = "2";

    application.save();
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "Application is updated Successfully",

      data: {
        //user.JSON() part gets encrypted

        // token: jwt.sign(user.toJSON(), env.jwt_secret, {
        //   expiresIn: "100000",
        // }),
        application,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.closeJob = async function (req, res) {
  try {
    let job = await Job.findById(req.body.jobid);

    job.status = "closed";

    job.save();
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "Job is updated Successfully",

      data: {
        //user.JSON() part gets encrypted

        // token: jwt.sign(user.toJSON(), env.jwt_secret, {
        //   expiresIn: "100000",
        // }),
        job,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

function getTransport() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
}

// Generate OTP ans send email to user
module.exports.generateOtp = async function (req, res) {
  const otp = Math.floor(100000 + Math.random() * 900000);
  try {
    let authOtp = await AuthOtp.create({
      userId: req.body.userId,
      otp: otp,
    });

    const { email } = await User.findById(req.body.userId);
    // Send mail to user
    const mailOptions = {
      from: '"Job Portal" <' + process.env.EMAIL + ">", // sender address
      to: email, // list of receivers
      subject: "OTP", // Subject line
      html: `<p>Your OTP is ${otp}</p>`, // plain text body
    };

    await getTransport().sendMail(mailOptions);

    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      success: true,
      message: "OTP is generated Successfully",
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.verifyOtp = async function (req, res) {
  try {
    const authOtp = await AuthOtp.findOne({
      userId: req.body.userId,
      otp: req.body.otp,
    });

    if (!authOtp) {
      return res.json(422, {
        error: true,
        message: "OTP is not correct",
      });
    }

    authOtp.remove();

    await User.updateOne(
      { _id: req.body.userId },
      { $set: { isVerified: true } }
    );

    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      success: true,
      message: "OTP is verified Successfully",
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
module.exports.saveJob = async function (req, res) {
  try {
    const { userId, jobId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }


    if (jobId) {
      if (!user.savedJobs.includes(jobId)) {
        user.savedJobs.push(jobId);
        await user.save();
      }
      await user.populate('savedJobs');

      return res.status(200).json({
        message: "Job saved successfully",
        success: true,
        data: user.savedJobs,
      });
    } else {
      await user.populate('savedJobs');

      return res.status(200).json({
        message: "List of saved jobs retrieved successfully",
        success: true,
        data: user.savedJobs,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
      success: false,
    });
  }
};

module.exports.unsaveJob = async function (req, res) {
  try {
    const { userId, jobId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    user.savedJobs = user.savedJobs.filter(id => id != jobId);
    await user.save();
    await user.populate('savedJobs');

    return res.status(200).json({
      message: "Job unsaved successfully",
      success: true,
      data: user.savedJobs,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
      success: false,
    });
  }
};
