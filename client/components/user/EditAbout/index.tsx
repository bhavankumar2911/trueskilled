import React, { FC, FormEvent, FormEventHandler, useState } from "react";
import Button from "../../utils/Button";
import Input from "../../utils/Input";
import { useMutation } from "react-query";
import axios from "axios";
import useCurrentUserID from "../../../hooks/useCurrentUserID";
import FlashSuccess from "../../utils/FlashSuccess";
import { useUserContext } from "../../../providers/User";

interface Props {
  bio: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditAbout: FC<Props> = ({ bio, setShowModal }) => {
  const [newAbout, setNewAbout] = useState(bio);
  const currentUserID = useCurrentUserID();
  const [success, setSuccess] = useState("");
  const { updateAbout } = useUserContext();
  const { mutate } = useMutation(
    (data: string) =>
      axios.patch(`/user/about/${currentUserID}`, { about: data }),
    {
      onError: (err) => console.log(err),
      onSuccess: (res) => {
        setSuccess(res.data.message);
        setShowModal(false);
        if (updateAbout) updateAbout(newAbout);
      },
    }
  );

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    mutate(newAbout);
  };

  return (
    <div>
      {success && <FlashSuccess success={success} setSuccess={setSuccess} />}

      <form onSubmit={handleSubmit}>
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
