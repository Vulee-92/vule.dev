export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  date: string;
  readTime: number;
  author: {
    name: string;
    avatar: string;
  };
  tags: string[];
  videoUrl?: string;
  videoDemo?: string;
  youtubeVideos?: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

export const blogPosts: BlogPost[] = [
//   {
//     id: 'blog-1',
//     title: 'Hành Trình Học Lập Trình Của Một Người Yêu Âm Nhạc',
//     description: 'Chia sẻ về quá trình từ một người chơi nhạc trở thành một lập trình viên, và cách kết hợp cả hai đam mê này.',
//     content: `
//       <p>Mọi chuyện bắt đầu từ những buổi tối ngồi đàn guitar và ước mơ về một ứng dụng có thể giúp mọi người học nhạc dễ dàng hơn...</p>
      
//       <h2>Những Bước Đầu Tiên</h2>
//       <p>Ban đầu, việc học code với mình thật sự rất khó khăn. Từ việc không biết bắt đầu từ đâu, cho đến những lúc gặp bug và không biết cách fix...</p>
      
//       <h2>Kết Hợp Âm Nhạc và Lập Trình</h2>
//       <p>Dần dần, mình nhận ra rằng âm nhạc và lập trình có nhiều điểm tương đồng. Cả hai đều đòi hỏi sự sáng tạo, tính logic và sự kiên nhẫn...</p>
      
//       <h2>Xây Dựng Hymns Center</h2>
//       <p>Sau nhiều đêm thức trắng code và debug, cuối cùng phiên bản đầu tiên của Hymns Center đã ra đời...</p>
//     `,
//     image: '/assets/blog/journey.jpg',
//     category: 'Chia Sẻ',
//     date: '2024-03-15',
//     readTime: 5,
//     author: {
//       name: 'Lê Bùi Thành Vũ',
//       avatar: '/assets/avatar.jpg'
//     },
//     tags: ['Lập Trình', 'Âm Nhạc', 'Học Tập']
//   },
//   {
//     id: 'blog-2',
//     title: 'Tại Sao Chọn ReactJS Cho Dự Án Của Bạn?',
//     description: 'Phân tích ưu và nhược điểm của ReactJS, và lý do tại sao nó là lựa chọn tốt cho các dự án web hiện đại.',
//     content: `
//       <p>ReactJS đã trở thành một trong những framework phổ biến nhất cho phát triển web front-end...</p>
      
//       <h2>Ưu Điểm của ReactJS</h2>
//       <p>1. Virtual DOM giúp tối ưu hiệu suất</p>
//       <p>2. Component-based architecture giúp code dễ tái sử dụng</p>
//       <p>3. Cộng đồng lớn và nhiều thư viện hỗ trợ</p>
      
//       <h2>Khi Nào Nên Dùng ReactJS?</h2>
//       <p>ReactJS đặc biệt phù hợp cho các ứng dụng có nhiều tương tác người dùng...</p>
//     `,
//     image: '/assets/blog/react.jpg',
//     category: 'Công Nghệ',
//     date: '2024-03-10',
//     readTime: 7,
//     author: {
//       name: 'Lê Bùi Thành Vũ',
//       avatar: '/assets/avatar.jpg'
//     },
//     tags: ['ReactJS', 'Frontend', 'Web Development']
//   },
  {
    id: 'blog-3',
    title: 'Tối Ưu Hóa Chăm Sóc Khách Hàng Với Telegram Bot',
    description: 'Giải pháp tự động hóa hiệu quả cho việc hỗ trợ khách hàng 24/7 mà không cần nhân viên trực chat liên tục.',
    content: `
      <p>Trong thời đại số hóa, việc chăm sóc khách hàng hiệu quả là một trong những yếu tố quan trọng quyết định sự thành công của doanh nghiệp. Tuy nhiên, với các shop online nhỏ, việc duy trì đội ngũ nhân viên hỗ trợ 24/7 là một thách thức lớn về cả nguồn lực và chi phí.</p>

      <h2>Giải Pháp Thông Minh Với Telegram</h2>
      <p>Chúng tôi đã phát triển một giải pháp đơn giản nhưng hiệu quả, tận dụng sức mạnh của nền tảng Telegram để tự động hóa quá trình hỗ trợ khách hàng. Hệ thống hoạt động theo quy trình sau:</p>
      
      <h2>Quy Trình Hoạt Động</h2>
      <p>1. Khách hàng đặt câu hỏi trên website</p>
      <p>2. Hệ thống tự động gửi thông báo tới Telegram của admin</p>
      <p>3. Admin có thể trả lời mọi lúc, mọi nơi thông qua Telegram</p>
      <p>4. Phản hồi được tự động gửi lại cho khách hàng</p>

      <h2>Tính Năng Nổi Bật</h2>
      <p>• Thông báo real-time qua Telegram</p>
      <p>• Hệ thống xác thực và phân quyền admin</p>
      <p>• Quản lý trạng thái câu hỏi</p>
      <p>• Hỗ trợ đa ngôn ngữ</p>
      <p>• Tìm kiếm thông minh</p>

      <h2>Lợi Ích Mang Lại</h2>
      <p>• Tiết kiệm chi phí vận hành</p>
      <p>• Nâng cao hiệu quả phản hồi</p>
      <p>• Quản lý tập trung, không bỏ sót</p>
      <p>• Linh hoạt trong việc hỗ trợ khách hàng</p>

      <h2>Demo Thực Tế</h2>
      <p>Dưới đây là video demo chi tiết về cách hệ thống hoạt động trong thực tế. Bạn có thể thấy được quy trình từ khi khách hàng gửi câu hỏi cho đến khi nhận được phản hồi diễn ra một cách mượt mà và hiệu quả như thế nào.</p>
    `,
    image: '#',
    category: 'Công Nghệ',
    date: '2025-02-26',
    readTime: 6,
    author: {
      name: 'Lê Bùi Thành Vũ',
      avatar: '/assets/images/avatar/vule.JPG'
    },
    tags: ['Telegram', 'Bot', 'Customer Service', 'Automation'],
    videoUrl: '/assets/video/intro-telegram.mp4',
    videoDemo: '/assets/video/blog1.MP4'
  },
  {
    id: 'blog-hymns-game',
    title: 'Hymns - Số Hoá Quản Lý Lớp Học Âm Nhạc Với Mini Games Thú Vị',
    description: 'Khám phá cách Hymns đang cách mạng hóa việc học nhạc thông qua các mini game tương tác, giúp việc học lý thuyết âm nhạc trở nên thú vị và hiệu quả hơn.',
    content: `
      <h2>Giới Thiệu</h2>
      <p>Hymns là một dự án đột phá trong lĩnh vực giáo dục âm nhạc, kết hợp công nghệ hiện đại với phương pháp giảng dạy truyền thống. Được phát triển với mục tiêu số hoá và tối ưu hoá quy trình quản lý lớp học âm nhạc, Hymns không chỉ là một công cụ quản lý mà còn là một nền tảng học tập tương tác, mang đến trải nghiệm học nhạc hoàn toàn mới.</p>

      <h2>Tính Năng Nổi Bật</h2>
      <h3>1. Hệ Thống Mini Games Tương Tác</h3>
      <p>Hymns tích hợp hai mini game được thiết kế đặc biệt để phát triển kỹ năng âm nhạc:</p>

      <h4>Game Luyện Cảm Âm</h4>
      <ul>
        <li>Phát triển khả năng nhận diện nốt nhạc và hợp âm</li>
        <li>Rèn luyện tai nghe thông qua các bài tập tương tác</li>
        <li>Hệ thống cấp độ thông minh, tự điều chỉnh theo trình độ người học</li>
      </ul>

      <h4>Game Phát Triển Phản Xạ Âm Nhạc</h4>
      <ul>
        <li>Tăng cường khả năng phản xạ với các yếu tố âm nhạc</li>
        <li>Phát triển kỹ năng đọc nhạc và nhận diện ký hiệu âm nhạc</li>
        <li>Tích hợp các bài học lý thuyết vào gameplay</li>
      </ul>

      <h2>Phương Pháp Học Tiệm Tiến</h2>
      <p>Hymns áp dụng phương pháp học tiệm tiến (Progressive Learning) được nghiên cứu kỹ lưỡng:</p>
      <ul>
        <li>Lộ trình học tập được cá nhân hoá</li>
        <li>Hệ thống điều chỉnh độ khó tự động</li>
        <li>Phản hồi chi tiết sau mỗi bài tập</li>
        <li>Tích hợp lý thuyết vào thực hành</li>
      </ul>

      <h2>Công Nghệ & Thiết Kế</h2>
      <ul>
        <li>Giao diện người dùng hiện đại, thân thiện</li>
        <li>Tương thích đa nền tảng (Desktop, Mobile)</li>
        <li>Hệ thống phân tích dữ liệu học tập</li>
        <li>Tích hợp AI hỗ trợ học tập</li>
      </ul>

      <h2>Hướng Dẫn Trải Nghiệm Game</h2>
      <p>Để trải nghiệm các mini game trong Hymns, bạn có thể làm theo các bước sau:</p>

      <div class="image-guide">
        <img src="/assets/images/blogs/game/game3.png" alt="Hướng dẫn truy cập terminal" />
        <p class="caption">Bước 1: Truy cập giao diện terminal và nhập số 0 để xem danh sách lệnh</p>
      </div>

      <div class="image-guide">
        <img src="/assets/images/blogs/game/game4.png" alt="Hướng dẫn chọn game" />
        <p class="caption">Bước 2: Nhập số 10 để truy cập và chơi thử các mini game</p>
      </div>

      <h2>Tương Lai của Dự Án</h2>
      <p>Hymns đang trong giai đoạn phát triển tích cực với nhiều tính năng mới đang được nghiên cứu và phát triển:</p>
      <ul>
        <li>Tích hợp trí tuệ nhân tạo để cá nhân hoá trải nghiệm học tập</li>
        <li>Mở rộng thư viện bài tập và mini game</li>
        <li>Phát triển tính năng học nhóm và tương tác xã hội</li>
        <li>Tối ưu hoá hệ thống phân tích dữ liệu học tập</li>
      </ul>

      <h2>Demo Thực Tế</h2>
      <p>Dưới đây là video demo chi tiết về cách các mini game trong Hymns hoạt động:</p>
    `,
    image: '/assets/images/blogs/game/game3.png',
    category: 'Sản Phẩm',
    date: '2024-03-22',
    readTime: 10,
    author: {
      name: 'Lê Bùi Thành Vũ',
      avatar: '/assets/images/avatar/vule.JPG'
    },
    tags: ['Hymns', 'Học Nhạc', 'Game', 'EdTech', 'Âm Nhạc', 'Mini Games'],
    videoUrl: '/assets/images/blogs/game/game3.png',
    videoDemo: '/assets/video/trochoi.MP4'
  },
  {
    id: 'blog-minimal-workspace',
    title: 'Góc Làm Việc Tối Giản - Nơi Sáng Tạo Không Giới Hạn',
    description: 'Khám phá góc làm việc được thiết kế theo phong cách tối giản (minimalism) của mình, nơi mỗi món đồ đều có mục đích và ý nghĩa riêng.',
    content: `
      <p>Là một người theo đuổi phong cách sống tối giản (minimalism), mình luôn tin rằng "less is more" - càng đơn giản càng đẹp. Điều này được thể hiện rõ nhất qua góc làm việc của mình - nơi mình dành phần lớn thời gian để code và sáng tạo âm nhạc.</p>

      <h2>Triết Lý Thiết Kế</h2>
      <p>Mỗi món đồ trong góc làm việc của mình đều được chọn lựa kỹ càng, không chỉ về mặt công năng mà còn phải đảm bảo tính thẩm mỹ và sự hài hòa tổng thể. Mình tin rằng một không gian làm việc gọn gàng sẽ giúp tâm trí thoải mái và tăng năng suất làm việc.</p>

      <div style="margin: 40px 0;">
        <img src="/assets/images/blogs/blog-setup-desk/IMG_6146.JPG" alt="Góc làm việc tối giản" style="width: 100%; border-radius: 12px;" />
      </div>

      <h2>Các Thành Phần Chính</h2>
      
      <h3>1. Bàn Phím Cơ Keychron</h3>
      <p>Là trái tim của góc làm việc, bàn phím Keychron không chỉ đẹp về thiết kế mà còn mang lại trải nghiệm gõ tuyệt vời. Với keycap được tinh chỉnh theo ý thích, mỗi lần gõ phím đều mang lại cảm giác thỏa mãn.</p>

      <h3>2. Màn Hình Ultrawide</h3>
      <p>Màn hình ultrawide giúp mở rộng không gian làm việc, đặc biệt hữu ích khi code và chỉnh sửa âm nhạc. Tỷ lệ màn hình rộng cũng góp phần tạo nên vẻ đẹp hiện đại cho góc làm việc.</p>

      <div style="margin: 40px 0;">
        <img src="/assets/images/blogs/blog-setup-desk/IMG_6147.jpg" alt="Setup chi tiết" style="width: 100%; border-radius: 12px;" />
      </div>

      <h3>3. Ánh Sáng</h3>
      <p>Ánh sáng được thiết kế để vừa đủ, không quá chói chang nhưng đảm bảo độ sáng cần thiết cho công việc. Đèn LED dải được đặt tinh tế tạo điểm nhấn và không gian làm việc dễ chịu vào ban đêm.</p>

      <h2>Sự Kết Hợp Hoàn Hảo</h2>
      <p>Mỗi chi tiết trong góc làm việc đều được sắp xếp một cách có chủ đích. Từ vị trí đặt bàn phím, góc nghiêng của màn hình, đến cách bố trí các phụ kiện - tất cả đều nhằm tạo ra một không gian làm việc không chỉ đẹp mắt mà còn đảm bảo hiệu quả công việc.</p>

      <h2>Được Công Nhận</h2>
      <p>Rất vui khi setup này đã được Keychron - thương hiệu bàn phím cơ nổi tiếng thế giới đăng tải và chia sẻ. Điều này càng khẳng định rằng sự đơn giản và tinh tế trong thiết kế luôn có sức hút riêng.</p>

      <h2>Lời Kết</h2>
      <p>Góc làm việc không chỉ là nơi để làm việc, mà còn là không gian thể hiện cá tính và phong cách sống của mỗi người. Với mình, sự tối giản không có nghĩa là thiếu thốn, mà là sự chọn lọc để giữ lại những gì thực sự có ý nghĩa.</p>

      <h2>Video Tour Góc Làm Việc</h2>
      <p>Mình có quay một video ngắn để chia sẻ chi tiết hơn về góc làm việc này. Qua video, các bạn có thể thấy rõ hơn cách mình bố trí và sử dụng không gian, cũng như cảm nhận được không khí tối giản mà mình hướng đến.</p>
    `,
    image: '/assets/images/blogs/blog-setup-desk/IMG_6146.JPG',
    category: 'Lifestyle',
    date: '2025-02-26',
    readTime: 5,
    author: {
      name: 'Lê Bùi Thành Vũ',
      avatar: '/assets/images/avatar/vule.JPG'
    },
    tags: ['Setup', 'Minimalism', 'Workspace', 'Keychron', 'Lifestyle'],
    videoUrl: '/assets/images/blogs/blog-setup-desk/setup.webp',
    videoDemo: 'GTMY4nX-JX0'
  },
//   {
//     id: 'blog-4',
//     title: 'Hành Trình Âm Nhạc: Từ Người Chơi Guitar Đến Người Sáng Tạo',
//     description: 'Chia sẻ về quá trình học đàn guitar và cách âm nhạc đã thay đổi cuộc sống của tôi, từ những buổi biểu diễn đầu tiên đến việc sáng tác nhạc worship.',
//     content: `
//       <p>Âm nhạc đã luôn là một phần không thể thiếu trong cuộc sống của tôi. Từ những ngày đầu tiên cầm đàn guitar, tôi đã cảm nhận được sự kết nối đặc biệt giữa con người và âm nhạc.</p>

//       <h2>Những Bước Đầu Với Guitar</h2>
//       <p>Tôi bắt đầu học đàn guitar từ năm 15 tuổi. Ban đầu, như bao người mới học khác, tôi cũng gặp không ít khó khăn với những hợp âm cơ bản. Nhưng với sự kiên trì và đam mê, dần dần những nốt nhạc đã trở nên thân thuộc hơn.</p>

//       <img src="/assets/images/blogs/blog-music/IMG_6130.JPG" alt="Tập luyện guitar" style="width: 100%; border-radius: 12px; margin: 20px 0;" />

//       <h2>Hành Trình Worship</h2>
//       <p>Điểm đặc biệt trong hành trình âm nhạc của tôi là việc được phục vụ trong ban nhạc worship. Đây không chỉ là việc chơi nhạc đơn thuần, mà còn là cách để tôi thể hiện đức tin và kết nối với mọi người thông qua âm nhạc.</p>

//       <img src="/assets/images/blogs/blog-music/IMG_6131.JPG" alt="Biểu diễn worship" style="width: 100%; border-radius: 12px; margin: 20px 0;" />

//       <h2>Sáng Tạo Và Phát Triển</h2>
//       <p>Sau nhiều năm chơi đàn, tôi bắt đầu thử sức với việc sáng tác. Mỗi bài hát là một câu chuyện, một trải nghiệm riêng mà tôi muốn chia sẻ với mọi người. Việc kết hợp giữa lời ca và giai điệu đã giúp tôi thể hiện những cảm xúc một cách trọn vẹn nhất.</p>

//       <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
//         <img src="/assets/images/blogs/blog-music/IMG_6132.JPG" alt="Tập luyện" style="width: 100%; border-radius: 12px;" />
//         <img src="/assets/images/blogs/blog-music/IMG_6133.JPG" alt="Biểu diễn" style="width: 100%; border-radius: 12px;" />
//       </div>

//       <h2>Công Nghệ Và Âm Nhạc</h2>
//       <p>Là một lập trình viên, tôi luôn tìm cách kết hợp công nghệ vào âm nhạc. Từ việc sử dụng các phần mềm thu âm, chỉnh sửa âm thanh đến việc phát triển ứng dụng Hymns Center - tất cả đều nhằm mục đích mang âm nhạc đến gần hơn với mọi người.</p>

//       <h2>Tương Lai</h2>
//       <p>Âm nhạc và công nghệ sẽ tiếp tục là hai người bạn đồng hành trong hành trình của tôi. Tôi tin rằng, với sự kết hợp này, chúng tôi có thể tạo ra những giá trị mới, không chỉ trong việc giải trí mà còn trong việc kết nối cộng đồng thông qua âm nhạc.</p>

//       <h2>Một Số Sáng Tác Và Cover</h2>
//       <p>Dưới đây là một số bản nhạc mà tôi đã thể hiện, từ những bài Thánh ca đến các bản cover acoustic...</p>
//     `,
//     image: '/assets/images/blogs/blog-music/IMG_6129.JPG',
//     category: 'Âm Nhạc',
//     date: '2024-03-21',
//     readTime: 8,
//     author: {
//       name: 'Lê Bùi Thành Vũ',
//       avatar: '/assets/avatar.jpg'
//     },
//     tags: ['Âm Nhạc', 'Guitar', 'Worship', 'Sáng Tạo'],
//     youtubeVideos: [
//       {
//         id: 'FzR_TIGtNPE',
//         title: 'Thánh ca 290 - NƯƠNG CÁNH VĨNH SINH | Hynms',
//         description: 'Mỗi khi đàn bài "Nương Cánh Vĩnh Sinh", mình cảm nhận được sự bình an lạ thường. Giai điệu nhẹ nhàng như đôi cánh thiên thần, nâng tâm hồn ta vượt lên trên những lo toan thường nhật.'
//       },
//       {
//         id: 'a9UkboylqhY',
//         title: 'Thánh Ca 704 - NGÀI LÀ TẤT CẢ CHO TÔI | Hymns',
//         description: '"Ngài Là Tất Cả Cho Tôi" - một bài hát đặc biệt với mình. Mỗi nốt nhạc như một lời tâm sự, một lời tạ ơn sâu sắc.'
//       },
//       {
//         id: 'DtP2XNgnam4',
//         title: 'PERFECT - ED SHEERAN - Fingerstyle Guitar Cover',
//         description: '"Perfect" - một tình khúc về tình yêu hoàn hảo. Qua những nốt nhạc fingerstyle, tôi muốn truyền tải câu chuyện về một tình yêu đẹp đẽ, thuần khiết.'
//       }
//     ]
//   },
  // Thêm các bài viết khác...
]; 