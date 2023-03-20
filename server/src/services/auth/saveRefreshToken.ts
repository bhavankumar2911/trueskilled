import RefreshToken from "../../models/RefreshToken";

export default async (id: string, token: string) => {
  try {
    const record = await RefreshToken.findOne({ id });

    if (record) await RefreshToken.updateOne({ id }, { token });
    else await RefreshToken.create({ id, token });

    return true;
  } catch (error) {
    console.log("Cannot save token in db", error);
    return false;
  }
};
