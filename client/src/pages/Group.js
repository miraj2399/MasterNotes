// This code creates a component that displays group information, notes, and options to filter notes by type or leave the group.

import {
  Timeline,
  Button,
  TimelineItem,
  TimelineBody,
  TimelineHeader,
  TimelineConnector,
  TimelineIcon,
} from "@material-tailwind/react";
import { Chip } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useParams } from "react-router-dom";
import {
  GetGroupByIdService,
  LeaveGroupService,
  GetPersonBranchService,
  JoinGroupService
} from "../services/GroupServices";
import { useEffect, useState } from "react";
import InviteJoinGroup from "../components/InviteJoinGroup";
import LectureNotePreview from "../components/LectureNotePreview";
import Icon from "@mui/material/Icon";
import { Link } from "react-router-dom";
import Settings from "@mui/icons-material/Settings";
import { IconButton } from "@mui/material";
import ShareGroup from "../components/ShareGroup";
import DoneIcon from "@mui/icons-material/Done";
import AddIcon from "@mui/icons-material/Add";

export default function Group() {
  const filterTags = (notes, selectedTags) => {
    return notes.filter(
      (note) =>
        note.tags.filter((tagID) => selectedTags.includes(tagID)).length ===
        selectedTags.length
    );
  };
  const { id } = useParams();
  const [group, setGroup] = useState({});
  const [dates, setDates] = useState([]);
  const [notes, setNotes] = useState([{}]);
  const [branch, setBranch] = useState("all");
  const [personalBranch, setPersonalBranch] = useState([]);
  const [personalNotes, setPersonalNotes] = useState([]);
  const [masterNotes, setMasterNotes] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagNotes, setTagNotes] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    GetGroupByIdService(id).then((data) => {
      setGroup(data);
      setDates(data.dates);
      setNotes(data.notes);
      setTags(data.tags);
    });
    GetPersonBranchService(id).then((data) => {
      setPersonalBranch(data);
    });
    JoinGroupService(id);
  }, []);

  useEffect(() => {
    if (branch === "all") {
      setNotes(group.notes);
    } else if (branch === "master") {
      setBranch("master");
      let masterNotes = [];
      dates.forEach((date) => {
        let max = -1;
        let maxNote = {};
        notes.forEach((note) => {
          console.log(note);
          console.log(note.upvotes.length);
          if (note.date === date._id && note.upvotes.length > max) {
            max = note.upvotes.length;
            maxNote = note;
          }
        });
        if (maxNote._id) {
          masterNotes.push(maxNote);
        }
      });
      setMasterNotes(masterNotes);
    } else if (branch === "personal") {
      // personal branch contains noteid of notes that user has added to personal branch
      let personalNotes = [];
      personalBranch.notes.forEach((noteID) => {
        const note = notes.find((note) => note._id === noteID);
        if (note) {
          personalNotes.push(notes.find((note) => note._id === noteID));
        }
      });

      setPersonalNotes(personalNotes);
    }
  }, [branch]);

  useEffect(() => {
     if (!(selectedTags[0])){
      setTagNotes([]);
     }
  }, [selectedTags]);

  return (
    <div className="grid">
      <div className="flex h-72  justify-center items-center gap-2 mb-10 bg-green-500 bg-opacity-50">
        <div class="text-center">
          <h1
            color="blue-gray"
            className="hover:text-gray-600 text-gray-800 text-4xl text-center font-extralight mb-5"
          >
            {group.name}
          </h1>
          <h1
            color="blue-gray"
            className="hover:text-gray-600 text-gray-800 text-xl text-center font-extralight mb-5"
          >
            {group.courseTitle}
          </h1>
          {group.inviteOnly === true && <InviteJoinGroup group={group} />}
          {!group.inviteOnly &&
            <>
              <ShareGroup group={group} />
            </>
          }
        </div>
      </div>
      <div className="flex justify-center items-center gap-2 mb-10">
        <Button
          className="text-white font-light text-sm bg-green-500 hover:bg-green-600"
          buttonType="filled"
          size="regular"
          rounded={false}
          block={false}
          iconOnly={false}
          ripple="light"
          onClick={() => {
            window.location.href = `/createGroupNote/${group._id}`;
          }}
        >
          {" "}
          Create Note{" "}
        </Button>
      </div>
      <div>
        <div className="flex gap-2 items-center ">
          <p
            className="text-gray-500 
                text-lg font-extralight italic dark:text-gray-400 ml-3"
          >
            Filter by:
          </p>
          <ToggleButtonGroup size="small">
            {/* onclick change the color of the button */}
            <ToggleButton
              value="all"
              sx={{
                color: branch === "all" ? "white" : "black",
                backgroundColor: branch === "all" ? "black" : "white",
                "&:hover": {
                  backgroundColor: branch === "all" ? "gray" : "gray",
                },
              }}
              onClick={() => {
                setBranch("all");
              }}
            >
              all
            </ToggleButton>
            <ToggleButton
              sx={{
                color: branch === "master" ? "white" : "black",
                backgroundColor: branch === "master" ? "black" : "white",
                "&:hover": {
                  backgroundColor: branch === "master" ? "gray" : "gray",
                },
              }}
              value="master"
              onClick={() => {
                setBranch("master");
              }}
            >
              Master
            </ToggleButton>
            <ToggleButton
              sx={{
                color: branch === "personal" ? "white" : "black",
                backgroundColor: branch === "personal" ? "black" : "white",
                "&:hover": {
                  backgroundColor: branch === "personal" ? "gray" : "gray",
                },
              }}
              value="personal"
              onClick={() => {
                setBranch("personal");
              }}
            >
              Personal
            </ToggleButton>

            <ToggleButton
              sx={{
                color: branch === "tag" ? "white" : "black",
                backgroundColor: branch === "tag" ? "black" : "white",
                "&:hover": {
                  backgroundColor: branch === "tag" ? "gray" : "gray",
                },
              }}
              value="tag"
              onClick={() => {
                setBranch("tag");
              }}
            >
              Tag
            </ToggleButton>
          </ToggleButtonGroup>
          {branch === "tag" && (
            <div className="flex gap-2 items-center  overflow-x-scroll scrollbar-hide ">
              {tags &&
                tags.map((tag) =>
                  selectedTags.includes(tag._id) ? (
                    <Chip
                      icon={<DoneIcon color="white" />}
                      label={tag.name}
                      sx={{ backgroundColor: tag.color, color: "white" }}
                      onClick={() => {
                        setSelectedTags(
                          selectedTags.filter((tagID) => tagID !== tag._id)
                        );
                        setTagNotes(
                          filterTags(
                            notes,
                            selectedTags.filter((tagID) => tagID !== tag._id)
                          )
                        );
                      }}
                    />
                  ) : (
                    <Chip
                      icon={<AddIcon color="white" />}
                      label={tag.name}
                      sx={{ backgroundColor: tag.color, color: "white" }}
                      onClick={() => {
                        setSelectedTags([...selectedTags, tag._id]);
                        setTagNotes(
                          filterTags(notes, [...selectedTags, tag._id])
                        );
                      }}
                    />
                  )
                )}
            </div>
          )}

          {/* have a button on the right side for discussion */}
          <div className="flex-grow"></div>
          <div className="flex gap-2 items-center mr-5 p-5">
            <IconButton
              onClick={() => {
                window.location.href = `/groupsettings/${group._id}`;
              }}
            >
              <Settings />
            </IconButton>

            <Button
              size="small"
              color="amber"
              className="font-light"
              onClick={() => {
                window.location.href = `/discussion/${group._id}`;
              }}
            >
              {" "}
              discussion{" "}
            </Button>
          </div>
        </div>
      </div>

      <Timeline className="m-3">
        {dates &&
          dates.map((date) => (
            <div key={date.date} className="mb-24">
              <TimelineItem>
                <TimelineHeader>
                  <div className="flex justify-center items-center gap-2 py-3 bg-green-500 bg-opacity-50 rounded-xl pr-3">
                    <TimelineIcon color="green" />
                    <CalendarTodayIcon size="sm" />
                    <p className="text-black text-lg font-extralight">
                      {new Date(date.date).toDateString()}
                    </p>
                  </div>
                </TimelineHeader>
                <TimelineBody>
                  <div className="grid sm:grid-cols-2 gap-2 sm:min-w-[800px]  md:min-w-[900px] lg:min-w-[1000px] ">
                    {personalBranch &&
                      notes &&
                      branch === "all" &&
                      notes.map((note) => {
                        if (note.date === date._id) {
                          return (
                            <LectureNotePreview
                              key={note._id}
                              content={note.content
                                .split("\n")
                                .slice(1)
                                .join("\n")}
                              title={note.content.split("\n")[0]}
                              id={note._id}
                              author={
                                note.owner.firstName + " " + note.owner.lastName
                              }
                              upvotes={note.upvotes.length}
                              downvotes={note.downvotes.length}
                              inPersonalBranch={
                                personalBranch &&
                                personalBranch.notes &&
                                personalBranch.notes.includes(note._id)
                              }
                              tags={tags.filter((tag) => note.tags.includes(tag._id))}
                            />
                          );
                        }
                      })}
                    {personalBranch &&
                      masterNotes &&
                      branch === "master" &&
                      masterNotes.map((note) => {
                        if (note.date === date._id) {
                          return (
                            <LectureNotePreview
                              key={note._id}
                              content={note.content
                                .split("\n")
                                .slice(1)
                                .join("\n")}
                              title={note.content.split("\n")[0]}
                              id={note._id}
                              author={
                                note.owner.firstName + " " + note.owner.lastName
                              }
                              upvotes={note.upvotes.length}
                              downvotes={note.downvotes.length}
                              inPersonalBranch={
                                personalBranch &&
                                personalBranch.notes &&
                                personalBranch.notes.includes(note._id)
                              }
                              tags={tags.filter((tag) => note.tags.includes(tag._id))}
                            />
                          );
                        }
                      })}

                    {personalNotes &&
                      branch === "personal" &&
                      personalNotes.map((note) => {
                        if (note.date === date._id) {
                          return (
                            <LectureNotePreview
                              key={note._id}
                              content={note.content
                                .split("\n")
                                .slice(1)
                                .join("\n")}
                              title={note.content.split("\n")[0]}
                              id={note._id}
                              author={
                                note.owner.firstName + " " + note.owner.lastName
                              }
                              upvotes={note.upvotes.length}
                              downvotes={note.downvotes.length}
                              tags={tags.filter((tag) => note.tags.includes(tag._id))}
                            />
                          );
                        }
                      })}
                    {tagNotes &&
                      branch === "tag" &&
                      tagNotes.map((note) => {
                        if (note.date === date._id) {
                          return (
                            <LectureNotePreview
                              key={note._id}
                              content={note.content
                                .split("\n")
                                .slice(1)
                                .join("\n")}
                              title={note.content.split("\n")[0]}
                              id={note._id}
                              author={
                                note.owner.firstName + " " + note.owner.lastName
                              }
                              upvotes={note.upvotes.length}
                              downvotes={note.downvotes.length}
                              tags={tags.filter((tag) => note.tags.includes(tag._id))}
                            />
                          );
                        }
                      })}

                    {!notes && <div>No notes yet</div>}
                  </div>
                </TimelineBody>
                <TimelineConnector />
              </TimelineItem>
            </div>
          ))}
      </Timeline>
      <div class="text-center m-5">
        <Button
          className="text-white font-light text-sm bg-red-500 hover:bg-red-600 mr-3"
          onClick={() => {
            LeaveGroupService(group._id);
            window.location.href = "/dashboard";
          }}
        >
          Leave Group
        </Button>

        <Link to="/dashboard">
          <Button className="text-white font-light text-sm ml-3" color="black">
            Back
          </Button>
        </Link>
      </div>
    </div>
  );
}
