import Comment from "./Comment";

export default interface Project {
  title: string;
  description: string;
  tags: string[];
  repositoryLink: string;
  previewLink: string;
  video: string;
  thumbnail: string;
  upvotes: string[];
  comments: Comment[];
  _id: string;
}
