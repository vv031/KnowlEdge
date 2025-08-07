-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: blog_db
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount` decimal(4,2) DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (12,'Introduction to Machine Learning','This comprehensive course provides an in-depth understanding of machine learning concepts, including supervised and unsupervised learning, algorithms, and real-world applications.',299.99,15.00),(13,'Deep Learning Fundamentals','Explore the fundamentals of deep learning, including neural networks, deep neural networks, and their applications in various fields such as image recognition and natural language processing.',399.99,25.00),(14,'Data Science with Python','Learn how to harness the power of Python for data science. This course covers data manipulation, analysis, visualization, and machine learning using Python libraries like pandas and scikit-learn.',199.99,5.00),(15,'AI in Healthcare','Discover the transformative impact of AI in healthcare. This course covers AI applications in medical diagnosis, treatment planning, patient monitoring, and healthcare management.',499.99,20.00),(16,'Natural Language Processing Essentials','This course covers the core concepts of natural language processing, including text analysis, sentiment analysis, and the use of NLP in chatbots and voice assistants.',349.99,12.50),(17,'Computer Vision with TensorFlow','Learn the fundamentals of computer vision and how to implement powerful image recognition models using TensorFlow. Topics include image processing, convolutional neural networks, and real-world applications.',459.99,18.75);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `payments_user_id` int NOT NULL,
  `payments_course_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(45) NOT NULL,
  `paid_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`payments_user_id`),
  KEY `payments_course_id_idx` (`payments_course_id`),
  CONSTRAINT `payments_user_id` FOREIGN KEY (`payments_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,1,13,299.99,'UPI','2024-11-07 20:04:17');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `publish_time` datetime DEFAULT NULL,
  `creation_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'Exploring the Wonders of AI','Artificial Intelligence (AI) is revolutionizing the way we interact with technology. From self-driving cars to virtual assistants, AI is at the forefront of innovation. This post delves deep into the various applications of AI, its impact on different industries, and what the future holds for this rapidly evolving field. The journey of AI began decades ago, but it is only in recent years that we have seen exponential growth in its capabilities and applications. The potential of AI is boundless, and it continues to push the boundaries of what was once thought impossible. In healthcare, AI is transforming the way we diagnose and treat diseases, making processes faster and more accurate. In the automotive industry, self-driving cars are becoming a reality, promising a future with reduced accidents and more efficient transportation. The field of AI is not without its challenges and ethical considerations, but the progress we have made so far is nothing short of remarkable. As we look to the future, the possibilities are endless, and it is an exciting time to be part of this technological revolution.','2024-11-07 14:00:30','2024-11-07 19:45:33'),(2,'The Evolution of Smart Technology','Smart technology has become an integral part of our daily lives, enhancing convenience, efficiency, and connectivity. From smartphones and smartwatches to smart homes and cities, this technology is reshaping the way we live and interact with the world around us. This post explores the history of smart technology, its current applications, and the exciting advancements on the horizon. The journey began with the invention of the smartphone, which combined the functionalities of a phone, a computer, and a camera into one powerful device. Over the years, we have seen the emergence of smart home devices like thermostats, security cameras, and voice assistants that make our lives more comfortable and secure. Smart cities are the next frontier, with technologies that optimize energy usage, manage traffic, and enhance public safety. As we look ahead, the integration of artificial intelligence, the Internet of Things (IoT), and 5G technology promises even greater innovations. The future of smart technology is bright, and its potential to improve our lives is immense.','2024-11-07 16:30:45','2024-11-07 19:46:00'),(3,'Sustainable Living: A Guide to Eco-Friendly Practices','Sustainable living is more than just a buzzword; it\'s a necessity for preserving our planet for future generations. This post explores practical tips and strategies for adopting an eco-friendly lifestyle. From reducing waste and conserving energy to supporting sustainable products and practices, there are numerous ways to make a positive impact. Simple actions like recycling, composting, and using reusable products can significantly reduce our carbon footprint. Additionally, embracing renewable energy sources, such as solar and wind power, can help decrease our reliance on fossil fuels. Sustainable living also involves making mindful choices about the products we buy and the companies we support. By choosing brands that prioritize environmental responsibility, we can drive positive change in the market. The journey to sustainability starts with small, everyday actions that collectively make a big difference.','2024-11-07 18:45:00','2024-11-07 19:46:21'),(4,'The Rise of Remote Work: Benefits and Challenges','The COVID-19 pandemic has accelerated the adoption of remote work, transforming the traditional office environment. This post delves into the benefits and challenges of this new way of working. Remote work offers numerous advantages, such as increased flexibility, reduced commuting time, and the ability to work from anywhere. For many, it has improved work-life balance and boosted productivity. However, remote work also presents challenges, including the potential for isolation, difficulties in collaboration, and the blurring of boundaries between work and personal life. Companies have had to adapt by implementing new tools and practices to support remote employees. Looking forward, the hybrid work model, which combines remote and in-office work, is likely to become the norm. This approach offers the best of both worlds, providing flexibility while maintaining opportunities for face-to-face interaction and collaboration.','2024-11-08 09:15:30','2024-11-07 19:46:32'),(5,'The Future of Education: Embracing Digital Learning','The education sector is undergoing a significant transformation, driven by digital learning technologies. This post examines the trends and innovations shaping the future of education. Online learning platforms, virtual classrooms, and educational apps have made learning more accessible and flexible. These tools provide personalized learning experiences, allowing students to learn at their own pace and in their own time. Digital learning also offers a wealth of resources, from interactive simulations and videos to real-time feedback and assessments. However, the transition to digital learning is not without its challenges. Ensuring equitable access to technology, maintaining student engagement, and providing adequate support for teachers are critical factors. As we move forward, the integration of artificial intelligence, augmented reality, and other advanced technologies will continue to enhance the educational experience, preparing students for the demands of the modern world.','2024-11-08 14:00:00','2024-11-07 19:46:40'),(6,'The Impact of Social Media on Mental Health','Social media has become an integral part of our lives, offering numerous benefits such as connecting with friends and family, sharing experiences, and accessing information. However, its impact on mental health is a topic of growing concern. This post explores the positive and negative effects of social media on mental well-being. On the positive side, social media can provide a sense of community and support, especially for individuals who may feel isolated. It also offers platforms for raising awareness about mental health issues and sharing helpful resources. On the negative side, excessive use of social media can lead to feelings of anxiety, depression, and loneliness. The pressure to present a perfect image, the fear of missing out (FOMO), and exposure to cyberbullying are significant stressors. To mitigate these effects, it\'s important to use social media mindfully and set boundaries. Taking regular breaks, curating your feed to include positive content, and seeking professional help if needed can help maintain a healthy balance.','2024-11-08 16:45:15','2024-11-07 19:46:47'),(7,'The Future of Space Exploration','Space exploration has always captivated human imagination, and recent advancements have brought us closer to the stars than ever before. This post explores the current state of space exploration and the exciting prospects for the future. From Mars rovers to space tourism, the possibilities are endless. NASA, SpaceX, and other space agencies are working tirelessly to send humans to Mars, with missions planned for the near future. The International Space Station continues to serve as a hub for scientific research and international collaboration. The advent of private space companies has also opened up new opportunities for commercial space travel, making space more accessible than ever. As we look ahead, the possibilities of asteroid mining, lunar colonies, and even interstellar travel are on the horizon. The future of space exploration is bright, and it\'s an exciting time to witness the dawn of a new space age.','2024-11-09 10:00:00','2024-11-07 19:48:05'),(8,'Advancements in Renewable Energy Technologies','Renewable energy is crucial for a sustainable future, and significant advancements have been made in this field. This post delves into the latest innovations in renewable energy technologies and their impact on our world. Solar power has become more efficient and affordable, with innovations like solar panels that can generate electricity even on cloudy days. Wind energy has also seen improvements, with larger and more efficient turbines being developed. Additionally, energy storage solutions, such as advanced batteries, are enhancing the reliability and stability of renewable energy systems. The integration of smart grids is enabling better management and distribution of energy. These advancements are not only reducing our dependence on fossil fuels but also helping to mitigate climate change. As technology continues to evolve, the future of renewable energy looks promising, offering a cleaner and more sustainable world for future generations.','2024-11-09 12:30:45','2024-11-07 19:48:11'),(9,'The Impact of Artificial Intelligence on Healthcare','Artificial Intelligence (AI) is revolutionizing healthcare, offering new ways to diagnose, treat, and manage diseases. This post explores the various applications of AI in healthcare and its potential to transform the industry. AI-powered diagnostic tools are enabling earlier and more accurate detection of diseases, such as cancer and heart disease. Machine learning algorithms are helping to analyze vast amounts of medical data, leading to more personalized and effective treatments. In addition, AI is being used to develop new drugs, predict disease outbreaks, and improve patient care. Telemedicine, powered by AI, is making healthcare more accessible, especially in remote and underserved areas. While there are challenges, including data privacy and ethical considerations, the benefits of AI in healthcare are undeniable. The future of healthcare is bright, with AI playing a pivotal role in improving health outcomes and saving lives.','2024-11-09 15:00:00','2024-11-07 19:48:17'),(10,'The Role of Big Data in Business Innovation','Big data is driving business innovation, providing valuable insights that are transforming industries. This post delves into the role of big data in business and how it is being leveraged to gain a competitive edge. Companies are using big data analytics to understand customer behavior, optimize operations, and develop new products and services. Predictive analytics is helping businesses forecast trends and make data-driven decisions. In addition, big data is enhancing marketing strategies, enabling personalized and targeted campaigns. The integration of big data with artificial intelligence and machine learning is opening up new possibilities for automation and innovation. However, managing and analyzing large volumes of data comes with its challenges, including data security and privacy concerns. As businesses continue to embrace big data, it is crucial to address these challenges and harness the full potential of data-driven innovation.','2024-11-09 18:45:00','2024-11-07 19:48:23'),(11,'Reflections on the Digital Transformation Era','The digital transformation era has fundamentally changed the way we live, work, and interact with technology. This post looks back on the milestones and impacts of digital transformation over the past decade. From the rise of cloud computing to the proliferation of mobile devices and the Internet of Things (IoT), digital technologies have reshaped industries and everyday life. Businesses have adopted digital tools to streamline operations, improve customer experiences, and drive innovation. Remote work, powered by digital collaboration tools, has become more prevalent, enabling a flexible and efficient workforce. However, digital transformation has also brought challenges, such as cybersecurity threats and the need for digital literacy. As we reflect on these changes, it\'s clear that the journey of digital transformation is ongoing, with new technologies and trends continuing to emerge. The lessons learned from the past decade will guide us as we navigate the future of digital innovation.','2022-05-15 10:30:00','2024-11-07 19:49:31'),(12,'The Rise and Fall of Tech Startups','The world of tech startups is dynamic and ever-changing, with many rising to fame and others fading away. This post explores the journey of tech startups over the past years, highlighting the factors that contribute to their success and failure. Successful startups often possess innovative ideas, strong leadership, and the ability to adapt to market changes. They leverage technology to disrupt traditional industries and create new business models. However, the path to success is fraught with challenges, including intense competition, funding issues, and market volatility. Many startups fail due to a lack of scalability, poor management, or an inability to meet customer needs. Despite these challenges, the startup ecosystem continues to thrive, driven by the relentless pursuit of innovation and the potential for significant rewards. Reflecting on the rise and fall of tech startups provides valuable insights for aspiring entrepreneurs and investors.','2021-09-25 14:45:00','2024-11-07 19:49:36');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchases`
--

DROP TABLE IF EXISTS `purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchases` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `course_id` int NOT NULL,
  `purchased_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `course_id_idx` (`course_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `course_id` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchases`
--

LOCK TABLES `purchases` WRITE;
/*!40000 ALTER TABLE `purchases` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `admin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin@mail.com','admin',1),(3,'johndoe','johndoe@example.com','securepassword',0),(4,'janedoe','janedoe@example.com','mypassword123',0),(5,'mike_ross','mike_ross@example.com','securepassword456',0),(6,'sarahconnor','sarahconnor@example.com','terminator123',0),(7,'tonystark','tonystark@example.com','ironman2024',1),(8,'brucewayne','brucewayne@example.com','batmanForever',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-08  2:43:46
