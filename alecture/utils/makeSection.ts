import { IDM, IChat } from '@typings/db';
import dayjs from 'dayjs';
//채팅 리스트 받아서 날짜별로 그룹화해서 리턴해줄 것임
export default function makeSection(chatList: (IDM | IChat)[]) {
  // 타입 빈배열도 채워줘야함
  const sections: { [key: string]: (IDM | IChat)[] } = {};
  chatList.forEach((chat) => {
    const monthDate = dayjs(chat.createdAt).format('YYYY-MM-DD');
    if (Array.isArray(sections[monthDate])) {
      sections[monthDate].push(chat);
    } else {
      sections[monthDate] = [chat];
    }
  });
  return sections;
}
