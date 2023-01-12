import React, { FC, useState } from "react";
import Button from "../../utils/Button";
import Input from "../../utils/Input";

interface Props {
  about: string;
}

const EditAbout: FC<Props> = ({ about }) => {
  const [newAbout, setNewAbout] = useState(about);

  return (
    <div>
      <form>
        <Input
          className="min-h-[200px]"
          placeholder="Describe yourself"
          value={newAbout}
          onChange={(e) => setNewAbout(e.target.value)}
          textarea
          block
        />

        <Button type="submit" block>
          Update
        </Button>
      </form>
    </div>
  );
};

export default EditAbout;
