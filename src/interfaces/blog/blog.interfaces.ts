export interface Blog {
  title: string;
  descripcion: string;
  tech: string;
  image: {
    url: string;
    public_id: string;
  };
  github: string;
  proyectUrl: string;
  
  
}

export interface Blogs {
  image?:       ImageClass | string;
  _id:          string;
  title:        string;
  descripcion?: string;
  tech?:        string;
  github?:      string;
  proyectUrl?:  string;
  createdAt:    Date;
  updatedAt:    Date;
}

export interface ImageClass {
  url:       string;
  public_id: string;
}
