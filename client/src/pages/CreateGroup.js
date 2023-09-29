import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea
} from "@material-tailwind/react";
import SelectedDatesForGroup from "../components/SelectedDatesForGroup";

export default function createGroup() {
  // manage multiple inputs

  const hintFocus = (hintId) => {
    console.log("focus");
  };
  const hintBlur = (hintId) => {
    console.log("blur");
  };
  return (
    <div className="grid md:grid-cols-2 p-2">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Create Group
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter the name of the group and the dates class meets on.
        </Typography>
        <form className="mt-8 mb-2 max-w-screen-lg">
          <div className="mb-4 flex flex-col gap-6">
            <div>
              <Input size="lg" label="Name" />
              <Typography className="ml-3 text-gray-500 text-sm">
                eg. CS 431 FALL 2023
              </Typography>
            </div>
            <div>
              <Input size="lg" label="Course Number" />
              <Typography  className="ml-3 text-gray-500 text-sm">
                eg. 01:198:431
              </Typography>
            </div>
            <div>
              <Input size="lg" label="Course Title" />
              <Typography  className="ml-3 text-gray-500 text-sm">
                eg. Software Engineering
              </Typography>
            </div>
            <div>
              <Input size="lg" label="Instructor" />
              <Typography className="ml-3 text-gray-500 text-sm">
                eg. Lily Chang
              </Typography>
            </div>
            <div>
              <Input size="lg" label="Location" />
              <Typography className="ml-3 text-gray-500 text-sm">
                eg. Hill 114
              </Typography>
            </div>
            <div>
                <div className="grid grid-cols-2 gap-4">
              <Input size="lg" label="Start time" type="time" />
              <Input size="lg" label="End time" type="time" />
              </div>

              <Typography className="ml-3 text-gray-500 text-sm">
                eg. 1:40pm - 3:00pm
              </Typography>
            </div>
            <div>
                <div className="grid grid-cols-2 gap-4">
              <Input size="lg" label="Start Date" type="date" />
              <Input size="lg" label="End Date" type="Date" />
              </div>

              <Typography className="ml-3 text-gray-500 text-sm">
                eg. 09/05/2023 - 12/22/2023
              </Typography>
            </div>

            <div>
                <Typography className="ml-3 text-gray-900 text-sm">
                Days of the week
                </Typography>
                <div className="grid grid-cols-4 md:grid-cols-7 gap-2  ">
                <Checkbox color="lightBlue"  label="Mon"/>
                <Checkbox color="lightBlue"  label="Tue"/>
                <Checkbox color="lightBlue"  label="Wed"/>
                <Checkbox color="lightBlue"  label="Thu"/>
                <Checkbox color="lightBlue"  label="Fri"/>
                <Checkbox color="lightBlue"  label="Sat"/>
                <Checkbox color="lightBlue"  label="Sun"/>
                </div>

                <Typography className="ml-3 text-gray-500 text-sm">
                eg. Tuesday & Thursday
                </Typography>
            </div>

            <div>
                <Textarea color="lightBlue" size="regular" label="Description" />
                <Typography className="ml-3 text-gray-500 text-sm">
                eg. This course is an introduction to the principles and practice of software engineering and the software development process. Topics include software life cycle models, requirements analysis, software design, implementation, testing, maintenance, and project management. Students will work in teams to develop a software project.
                </Typography>
            </div>

            <div>
                <div>
                <Checkbox color="lightBlue"  label="Invite only"/>
                <Checkbox color="lightBlue"  label="Public"/>
                </div>
                <Typography className="ml-3 text-gray-500 text-sm">
                Invite only: Only people who have been invited to the group can join.<br/>
                Public: Anyone with the link can join.
                </Typography>
            </div>

            <div>
                <Button color="lightBlue" ripple="light" type="submit" className="w-full">
                Create Group
                </Button>
            </div>

        

            
          </div>
        </form>
        
      </Card>
      <div>
        <SelectedDatesForGroup />
      </div>
    </div>
  );
}
