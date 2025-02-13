import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import OpenAI from 'openai';

@Injectable()
export class BotService {
  private readonly openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  private async fetchTextFromUrl(url: string): Promise<string> {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    return $('body').text().replace(/\s+/g, ' ').trim();
  }

  async analyzeCompliance(targetUrl: string, policyUrl: string) {
    const [targetText, policyText] = await Promise.all([
      this.fetchTextFromUrl(targetUrl),
      this.fetchTextFromUrl(policyUrl),
    ]);

    const prompt = `You are a compliance auditor. Compare the following webpage content against the provided compliance policy. Identify any non-compliant statements.

    **Compliance Policy:**
    ${policyText}

    **Webpage Content:**
    ${targetText}

    List non-compliant statements in a structured format.`;

    const response = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: prompt }],
      temperature: 0
    });

    return response.choices[0].message?.content || "No findings.";
  }
}
