import { isValidElement } from 'react';
import CreditCardDefaultClassifier from './CreditCardDefaultClassifier';
import GithubIssueImporter from './GithubIssueImporter';
import HandwrittenDigitsClassifier from './HandwrittenDigitsClassifier';
import LinkedinJobFinder from './LinkedinJobFinder';
import LinkedinWordTokenAnalyzer from './LinkedinWordTokenAnalyzer';
import ResumeTailor from './ResumeTailor';

const carousels = [
  {
    title: 'Credit Card Default Prediction Models',
    carousel: <CreditCardDefaultClassifier />,
  },
  { title: 'GitHub Issue Importer', carousel: <GithubIssueImporter /> },
  {
    title: 'Handwritten Digit Optical Recognition',
    carousel: <HandwrittenDigitsClassifier />,
  },
  { title: 'LinkedIn Job Finder', carousel: <LinkedinJobFinder /> },
  {
    title: 'LinkedIn Job Description Word Token Analyzer',
    carousel: <LinkedinWordTokenAnalyzer />,
  },
  { title: 'Resume Tailor', carousel: <ResumeTailor /> },
];

function getCarousel(projectTitle) {
  const result = carousels.find(
    (carousel) => carousel.title === projectTitle,
  ).carousel;

  if (result !== undefined)
    return { component: result, isValid: isValidElement(result) };

  return {
    component: null,
    isValid: false,
  };
}

export default getCarousel;
