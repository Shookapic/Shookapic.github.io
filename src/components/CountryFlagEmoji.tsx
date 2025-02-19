import { FC } from 'react';
import { 
  CountryCode, 
  countryNameRecord 
} from '../utils/countryNameRecord';
import { getCountryFlagEmoji } from '../utils/getCountryFlagEmoji';

interface CountryFlagEmojiProps {
  code?: CountryCode
}

export const CountryFlagEmoji: FC<CountryFlagEmojiProps> = ({ code }) => {
  const title = code ? countryNameRecord[code] || code : undefined
  return (
    <span role="img" aria-labelledby={title} title={title}>
      {code ? getCountryFlagEmoji(code) : "🏳"}
    </span>
  )
}
