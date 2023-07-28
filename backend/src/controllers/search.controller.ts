import { NextFunction, Request, Response } from "express";
import { IResponseData } from "../models/ResponseData";
import { levenshteinDistance, onlyUnique } from "../utils/helper";
import { dataFromFile } from "../utils/readFile";

// Get data for non-repeating words
let data = dataFromFile?.filter(onlyUnique);

export class SearchController {
  // Get Top 3
  async getTop3(req: Request, res: Response, next: NextFunction) {
    let response;
    const { keyword } = req.query;
    if (keyword) {
      // Use levenshtein Distance to calculate the similarity of words and only take the similarity from 0 to 2
      const results = data
        ?.map((word) => ({ word, distance: levenshteinDistance(word, String(keyword)) }))
        .filter((result) => result.distance <= 2)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3)
        .map((result) => result.word);
      response = { success: true, message: "Get top 3 words successfully", data: results };
      return res.status(200).json(response);
    }
    response = { success: true, message: "Bad request!" };
    return res.status(400).json(response);
  }

  // Add word Controller
  async add(req: Request, res: Response, next: NextFunction) {
    let response: IResponseData<null>;
    const { keyword } = req.body;
    if (keyword) {
      data?.push(String(keyword));
      data = data?.filter(onlyUnique);
      response = { success: true, message: "Add word successfully" };
      return res.status(200).json(response);
    }
    response = { success: true, message: "Bad request!" };
    return res.status(400).json(response);
  }

  // Delete word Controller
  async delete(req: Request, res: Response, next: NextFunction) {
    let response: IResponseData<null>;
    const { keyword } = req.body;
    if (keyword) {
      data = data?.filter((word) => word !== keyword);
      response = { success: true, message: "Remove word successfully" };
      return res.status(200).json(response);
    }
    response = { success: true, message: "Bad request!" };
    return res.status(400).json(response);
  }
}
