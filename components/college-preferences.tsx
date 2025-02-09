"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useUser } from "@/contexts/UserContext"
import { useInstitutes } from "@/hooks/useInstitutes"
import { programs } from "@/lib/collegeData"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { toast } from "@/components/ui/use-toast"

export function CollegePreferences() {
  const { preferences, setPreferences } = useUser()
  const [newPreference, setNewPreference] = useState({ institute: "", program: "" })

  const institutes = useInstitutes()

  useEffect(() => {
    // Load preferences from localStorage
    const savedPreferences = localStorage.getItem("preferences")
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences))
    }
  }, [setPreferences]) // Added setPreferences to dependencies

  useEffect(() => {
    // Save preferences to localStorage
    localStorage.setItem("preferences", JSON.stringify(preferences))
  }, [preferences])

  const handleAddPreference = () => {
    if (newPreference.institute && newPreference.program) {
      const institute = institutes.find((i) => i.code === newPreference.institute)
      const program = programs.find((p) => p.code === newPreference.program)
      if (institute && program) {
        setPreferences([...preferences, { institute, program }])
        setNewPreference({ institute: "", program: "" })
        toast({
          title: "Preference Added",
          description: "Your preference has been added successfully.",
        })
      }
    } else {
      toast({
        title: "Incomplete Preference",
        description: "Please select both an institute and a program.",
        variant: "destructive",
      })
    }
  }

  // Updated JEE Advanced papers data
  const jeeAdvancedPapers = {
    "2023": [
      {
        paper: "Paper 1",
        url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/Question%20%26%20Answers_JEE-%28Advanced%29-2023_Paper-1.pdf",
      },
      {
        paper: "Paper 2",
        url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/Question_and_Ans_JEE_Advanced_2023_Paper-2.pdf",
      },
    ],
    "2022": [
      {
        paper: "Paper 1",
        url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Answers%26Solutions_JEE-%28Advanced%29-2022_Paper-1_%28Combined%29.pdf?1sVfgxJ7vMfiJQvKWAVBrVERGdj4q9ZC",
      },
      {
        paper: "Paper 2",
        url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Answers%26Solutions_JEE-%28Advanced%29-2022_Paper-2_%28Combined%29_0.pdf?fi9xpM3xsxk5pYT9LuLihkTt1.N.a2DM",
      },
    ],
    "2021": [
      {
        paper: "Paper 1",
        url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/2021_1_English.pdf",
      },
      {
        paper: "Paper 2",
        url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/2021_2_English.pdf",
      },
    ],
    "2020": [
      {
        paper: "Paper 1",
        url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/2020_1_English.pdf",
      },
      {
        paper: "Paper 2",
        url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/2020_2_English.pdf",
      },
    ],
    "2019": [
      {
        paper: "Paper 1",
        url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/2019_1_English.pdf",
      },
      {
        paper: "Paper 2",
        url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/2019_2_English.pdf",
      },
    ],
    "2018": [
      {
        paper: "Paper 1",
        url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/2018_1.pdf",
      },
      {
        paper: "Paper 2",
        url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/2018_2.pdf",
      },
    ],
    "2017": [
      {
        paper: "Paper 1",
        url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/2017_1.pdf",
      },
      {
        paper: "Paper 2",
        url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/2017_2.pdf",
      },
    ],
    "2016": [
      {
        paper: "Paper 1",
        url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/2016_1_0.pdf",
      },
      {
        paper: "Paper 2",
        url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/2016_2.pdf",
      },
    ],
    "2015": [
      {
        paper: "Paper 1",
        url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/2015_1.pdf",
      },
      {
        paper: "Paper 2",
        url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/2015_2.pdf",
      },
    ],
    "2014": [
      {
        paper: "Paper 1",
        url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/2014_1.pdf",
      },
      {
        paper: "Paper 2",
        url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/2014_2.pdf",
      },
    ],
    "2013": [
      {
        paper: "Paper 1",
        url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/2013_1.pdf",
      },
      {
        paper: "Paper 2",
        url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/2013_2.pdf",
      },
    ],
    "2012": [
      {
        paper: "Paper 1",
        url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/2012_1.pdf",
      },
      {
        paper: "Paper 2",
        url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/2012_2.pdf",
      },
    ],
    // Add more years as needed
  }

  // Updated JEE Mains papers data
  const jeeMainsPapers = {
    "2023": {
      "Session 1": {
        "January 24": [
          {
            slot: "Shift 1",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/Answer-and-Solutions_JEE_Main-2023_Ph-1_24-01-2023_Morning_shift-1.pdf",
          },
          {
            slot: "Shift 2",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/Answer-and-Solutions_JEE_Main-2023_Ph-1_24-01-2023_Evening_shfit-2.pdf",
          },
        ],
        "January 25": [
          {
            slot: "Shift 1",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/Answer-and-Solutions_JEE_Main-2023_Ph-1_25-01-2023_Morning_shift-1.pdf",
          },
          {
            slot: "Shift 2",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/Answer-and-Solutions_JEE_Main-2023_Ph-1_25-01-2023_Evening_shift-2.pdf",
          },
        ],
        "January 29": [
          {
            slot: "Shift 1",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/Answer-and-Solutions_JEE_Main-2023_Ph-1_29-01-2023_Morning-shift-1.pdf",
          },
          {
            slot: "Shift 2",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/Answer-and-Solutions_JEE_Main-2023_Ph-1_29-01-2023_Evening_shift-2.pdf",
          },
        ],
        "January 30": [
          {
            slot: "Shift 1",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/Answer-and-Solutions_JEE_Main-2023_Ph-1_30-01-2023_Morning-shift-1.pdf",
          },
          {
            slot: "Shift 2",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/Answer-and-Solutions_JEE_Main-2023_Ph-1_30-01-2023_Evening-shift-2.pdf",
          },
        ],
        "January 31": [
          {
            slot: "Shift 1",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/Answer-and-Solutions_JEE_Main-2023_Ph-1_31-01-2023_Morning-shift-1.pdf",
          },
          {
            slot: "Shift 2",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/Answer-and-Solutions_JEE_Main-2023_Ph-1_31-01-2023_Evening-shift-2.pdf",
          },
        ],
        "February 1": [
          {
            slot: "Shift 1",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/Answer-and-Solutions_JEE_Main-2023_Ph-1_01-02-2023_Morning-shift-1.pdf",
          },
          {
            slot: "Shift 2",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/target_solutions/Answer-and-Solutions_JEE_Main-2023_Ph-1_01-02-2023_Evening-shift-2.pdf",
          },
        ],
      },
      "Session 2": {
        "April 6": [
          {
            slot: "Shift 1",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%20%26%20Sol_JEE%28Main%29-2023_Ph-2_%2806-04-2023%29_Shift-1_%28Morning%29.pdf?qiJo6AR8geqHF_jNUgHkSEuWC4ikoHka/",
          },
          {
            slot: "Shift 2",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%20%26%20Sol_JEE%28Main%29-2023_Ph-2_%2806-04-2023%29_Shift-2_%28Evening%29.pdf?XvgIYXb1GGWzHBvFJZEzHRFDOqAOyFvn/",
          },
        ],
        "April 8": [
          {
            slot: "Shift 1",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%20%26%20Sol_JEE%28Main%29-2023_Ph-2_%2808-04-2023%29_Shift-1_%28Morning%29.pdf?Io.I2mFmEvJFpP5JuqSnRY8SwAjSloet/",
          },
          {
            slot: "Shift 2",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%20%26%20Sol_JEE%28Main%29-2023_Ph-2_%2808-04-2023%29_Shift-2_%28Evening%29.pdf?j.z22mjvzJ8LslgOz_NpcOO07wSiUjkB/",
          },
        ],
        "April 10": [
          {
            slot: "Shift 1",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%20%26%20Sol_JEE%28Main%29-2023_Ph-2_%2810-04-2023%29_Shift-1_%28Morning%29.pdf?3taZA1U8cwzSkUgHUowY9CmG0vOhK_wu/",
          },
          {
            slot: "Shift 2",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%20%26%20Sol_JEE%28Main%29-2023_Ph-2_%2810-04-2023%29_Shift-2_%28Evening%29.pdf?wBSO0ttw1Ts93795MbkO89bDx90eXs8u/",
          },
        ],
        "April 11": [
          {
            slot: "Shift 1",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%20%26%20Sol_JEE%28Main%29-2023_Ph-2_%2811-04-2023%29_Shift-1_%28Morning%29.pdf?fStqfVoXZjosiOH4WUrfEb4qozyJZWAT/",
          },
          {
            slot: "Shift 2",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%20%26%20Sol_JEE%28Main%29-2023_Ph-2_%2811-04-2023%29_Shift-2_%28Evening%29.pdf?GgPImrC59dVpTlT6JpFoFMqMkItiJCOE/",
          },
        ],
        "April 12": [
          {
            slot: "Shift 1",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%20%26%20Sol_JEE%28Main%29-2023_Ph-2_%2812-04-2023%29_Shift-1_%28Morning%29.pdf?OUk6WuLXBtaQIZM6Fu70KWo_HESgRTIb/",
          },
        ],
        "April 13": [
          {
            slot: "Shift 1",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%20%26%20Sol_JEE%28Main%29-2023_Ph-2_%2813-04-2023%29_Shift-1_%28Morning%29.pdf?Of.Qr_5liWk_5cffGeGYxC21MYLXu92B/",
          },
          {
            slot: "Shift 2",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%20%26%20Sol_JEE%28Main%29-2023_Ph-2_%2813-04-2023%29_Shift-2_%28Evening%29.pdf?44bOpnBXKyRjE3qvQpckKSO7AePOow2o/",
          },
        ],
      },
    },
    "2022": {
      "Session 1": {
        "June 24": [
          {
            slot: "Shift 1",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%20and%20Solution_JEE%28Main%29-2022_Phase-1_24-06-2022_M.pdf?dQw4wHGDaduiSttNzKZfXAmrzHuXhagd",
          },
          {
            slot: "Shift 2",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%20and%20Solution_JEE%28Main%29-2022_Phase-1_24-06-2022_E.pdf?DDEEGYmCPDnOKa1wtTRU5FOe3Bk1AQ5z",
          },
        ],
        "June 25": [
          {
            slot: "Shift 1",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/JEE%20Main%20Graphic_Analysis-2022%20%2825th%20June%29_Evening.pdf?tZs0idvq9cS2UREU8oBcct1x6_F6pFfY",
          },
          {
            slot: "Shift 2",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%20and%20Solution_JEE%28Main%29-2022_Phase-1_25-06-2022_E.pdf?GrVq86j.39MdiBPs51OUwRkfleu5Dmtc",
          },
        ],
        "June 26": [
          {
            slot: "Shift 1",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%26Sol_JEE%28Main%29-2022_Phase-1_26-06-2022_%28Morning%29.pdf?G3O7X7KYyDZLa7AePiCWofRC7szvVqD6",
          },
          {
            slot: "Shift 2",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%26Sol_JEE%28Main%29-2022_Phase-1_26-06-2022_%28Evening%29.pdf?MtlRsRitBCiVtlozfBM5FE_zYf3wLShh",
          },
        ],
        "June 27": [
          {
            slot: "Shift 1",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%26Sol_JEE%28Main%29-2022_Phase-1_27-06-2022_%28Morning%29.pdf?5tiECqt5ROQCpDY15mV4n752uN4k5Z2T",
          },
          {
            slot: "Shift 2",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%26Sol_JEE%28Main%29-2022_Phase-1_27-06-2022_%28Evening%29.pdf?w9Bu0b6EltAK7gblKjEeKrZLkPrxRdU5",
          },
        ],
        "June 28": [
          {
            slot: "Shift 1",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%26Sol_JEE%28Main%29-2022_Phase-1_28-06-2022_%28Morning%29.pdf?gz.R6GfzX4.MBRGc3LIdSnwyoGIT0nLp",
          },
          {
            slot: "Shift 2",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%26Sol_JEE%28Main%29-2022_Phase-1_28-06-2022_%28Evening%29.pdf?kYXdtTh6qWEqlUD36c4nZ4tL4lLwW.yD",
          },
        ],
        "June 29": [
          {
            slot: "Shift 1",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%26Sol_JEE%28Main%29-2022_Phase-1_29-06-2022_%28Morning%29.pdf?Q9HgThgJrkBC484IiUmBLEukXQZf46N8",
          },
          {
            slot: "Shift 2",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%26Sol_JEE%28Main%29-2022_Phase-1_29-06-2022_%28Evening%29.pdf?JGZh39oB0xszoWJ0OMHkVRNG1OWielfG",
          },
        ],
      },
      "Session 2": {
        "July 25": [
          {
            slot: "Shift 1",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%26Sol_JEE%28Main%29-2022_%28Phase-2%29_%2825-07-2022%29_Morning_%28PCM%29_0.pdf?3O6Yaa92dNDhACdSFuROjFaxlrXqN6WQ",
          },
          {
            slot: "Shift 2",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%26Sol_JEE%28Main%29-2022_%28Phase-2%29_%2825-07-2022%29_Evening_%28PCM%29_1.pdf?TZPC17M8itw5BsDx68xVVC1fSWvdlowg",
          },
        ],
        "July 26": [
          {
            slot: "Shift 1",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%26Sol_JEE%28Main%29-2022_%28Phase-2%29_%2826-07-2022%29_Morning_%28PCM%29_1.pdf?yswvfE6kIpXAL2k3gu7kk2u2Wsg3ERdF",
          },
          {
            slot: "Shift 2",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%26Sol_JEE%28Main%29-2022_%28Phase-2%29_%2826-07-2022%29_Evening_%28PCM%29_1.pdf?9xQZcm2z85N5PRDmn2FdC0N8S6efeiog",
          },
        ],
        "July 27": [
          {
            slot: "Shift 1",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%26Sol_JEE%28Main%29-2022_%28Phase-2%29_%2827-07-2022%29_Morning_%28PCM%29_1.pdf?6ae6qmDfsFi3QChWGpLfa79sZq_TB78x",
          },
          {
            slot: "Shift 2",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%26Sol_JEE%28Main%29-2022_%28Phase-2%29_%2827-07-2022%29_Evening_%28PCM%29_0.pdf?82Joo04dR6X8dK8DvrTbp9vvrBQqHfoi",
          },
        ],
        "July 28": [
          {
            slot: "Shift 1",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%26Sol_JEE%28Main%29-2022_%28Phase-2%29_%2828-07-2022%29_Morning_%28PCM%29_0.pdf?nKEK.tzQG97EwDidmD0ya75XshsnvCwh",
          },
          {
            slot: "Shift 2",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%26Sol_JEE%28Main%29-2022_%28Phase-2%29_%2828-07-2022%29_Evening_%28PCM%29_0.pdf?JMbSbwKSCGsqed42w3sAfdxgFv5gxJZC",
          },
        ],
        "July 29": [
          {
            slot: "Shift 1",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%26Sol_JEE%28Main%29-2022_%28Phase-2%29_%2829-07-2022%29_Morning_%28PCM%29_0.pdf?hpq9xoqrKQlAUPMz_dtFZTkCrUq0ajyZ",
          },
          {
            slot: "Shift 2",
            url: "https://dcx0p3on5z8dw.cloudfront.net/Aakash/s3fs-public/pdf_management_files/sm_sa/Ans%26Sol_JEE%28Main%29-2022_%28Phase-2%29_%2829-07-2022%29_Evening_%28PCM%29_0.pdf?3_DkJZwlxGzbapAhkAQLoCPAU9VOEU4x",
          },
        ],
      },
    },

    // Add more years as needed
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">College Preferences</h2>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Institute</label>
            <select
              value={newPreference.institute}
              onChange={(e) => setNewPreference({ ...newPreference, institute: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Institute</option>
              {institutes.map((institute) => (
                <option key={institute.code} value={institute.code}>
                  {institute.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Program</label>
            <select
              value={newPreference.program}
              onChange={(e) => setNewPreference({ ...newPreference, program: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Program</option>
              {programs.map((program) => (
                <option key={program.code} value={program.code}>
                  {program.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Button onClick={handleAddPreference}>Add Preference</Button>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Current Preferences:</h3>
          <ul className="space-y-2" aria-label="Current preferences">
            {preferences.map((pref, index) => (
              <li key={index} className="p-2 bg-gray-50 rounded">
                {pref.institute.name} - {pref.program.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">Past Year Cutoffs</h3>
        <p className="mb-4">To view the past year cutoffs, please visit the official JOSAA website:</p>
        <a
          href="https://josaa.admissions.nic.in/Applicant/seatallotmentresult/currentorcr.aspx"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          JOSAA Seat Allotment Result
        </a>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">Past Year Papers</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="jee-advanced">
            <AccordionTrigger>JEE Advanced Question Papers</AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible className="w-full">
                {Object.entries(jeeAdvancedPapers).map(([year, papers]) => (
                  <AccordionItem value={`jee-advanced-${year}`} key={year}>
                    <AccordionTrigger>{year}</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {papers.map((paper) => (
                          <li key={paper.paper} className="p-2 bg-gray-50 rounded">
                            <a
                              href={paper.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              JEE Advanced {year} - {paper.paper}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="jee-mains">
            <AccordionTrigger>JEE Mains Question Papers</AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible className="w-full">
                {Object.entries(jeeMainsPapers)
                  .reverse()
                  .map(([year, sessions]) => (
                    <AccordionItem value={`jee-mains-${year}`} key={year}>
                      <AccordionTrigger>{year}</AccordionTrigger>
                      <AccordionContent>
                        <Accordion type="single" collapsible className="w-full">
                          {Object.entries(sessions).map(([session, dates]) => (
                            <AccordionItem value={`jee-mains-${year}-${session}`} key={session}>
                              <AccordionTrigger>{session}</AccordionTrigger>
                              <AccordionContent>
                                {Object.entries(dates).map(([date, slots]) => (
                                  <div key={date} className="mb-4">
                                    <h5 className="font-semibold mb-2">{date}</h5>
                                    <ul className="space-y-2">
                                      {Array.isArray(slots) ? (
                                        slots.map((slot) => (
                                          <li key={slot.slot} className="p-2 bg-gray-50 rounded">
                                            <a
                                              href={slot.url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-blue-600 hover:underline"
                                            >
                                              JEE Mains {year} {session} - {date} - {slot.slot}
                                            </a>
                                          </li>
                                        ))
                                      ) : (
                                        <li className="p-2 bg-gray-50 rounded">No slots available for this date</li>
                                      )}
                                    </ul>
                                  </div>
                                ))}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

