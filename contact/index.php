<!DOCTYPE html>
<html lang="en">

<head>
<?php require_once "../server/header.php"; ?>
<link rel="stylesheet" href="../assets/css/contact.css">
<title>Contact</title>
</head>

<body>
  <!-- NAV -->
  <?php $selected = "contact"; require_once "../nav.php" ?>

  <!-- CONTACT -->
  <div id="main" class="centered">
    <section class="horizontal-2 flex">
        <section id="contact-cards" class="horizontal-3 flex">
          <a id="linkedIn" href="https://www.linkedin.com/in/spencer-collins" class="card linked-card">
	          <span class="genericon genericon-linkedin-alt"></span>
	        </a>
          <a id="gitHub" href="https://github.com/CollinsSpencer" class="card linked-card doubleCard">
	          <span class="genericon genericon-github"></span>
	        </a>
          <a id="youtube" href="http://www.youtube.com/c/SpencerCollins97" class="card linked-card">
	          <span class="genericon genericon-youtube"></span>
	        </a>
          <a id="unl" href="http://cse.unl.edu/~scollins/" class="card linked-card">
            <?php echo file_get_contents("../assets/resources/unl.svg"); ?>
	        </a>
          <a id="meritpages" href="http://meritpages.com/CollinsSpencer" class="card linked-card">
	          <img src="/assets/resources/MeritPages.png" />
	        </a>
          <!-- <a href="#" class="card linked-card">
            <span class="genericon genericon-github"></span>
          </a> -->
        </section>

      <!-- Contact form -->
      <section id="contact" class="card">
        <h1 class="heading">Contact Me</h1>
        <h4>If you have any questions or would like to get in contact with me, feel free to use the following form.</h4>
        <form id="contactForm" class="vertical flex" method="post" action="">
          <section class="horizontal-2 flex">
            <input id="firstName" type="text" name="fields[first_name]" placeholder="First Name">
            <input id="lastName" type="text" name="fields[last_name]" placeholder="Last Name">
          </section>
          <input id="email" type="email" name="fields[email]" placeholder="Email">
          <input id="subject" type="text" name="fields[subject]" placeholder="Subject">
          <textarea id="message" name="fields[message]" placeholder="Message" rows="3" cols="50"></textarea>
          <section class="horizontal-2 flex">
            <input id="submit" type="submit" name="fields[send]" value="Send">
            <input id="reset" type="reset" name="fields[reset]" value="Reset">
          </section>
        </form>
        <h5>You will also receive a copy of your message.</h5>
      </section>
    </section>
  </div>

  <footer>
    <a href="/" class="inline-link">Spencer Collins</a>
  </footer>

<body>

<?php require_once "../server/footer.php"; ?>
<script type="text/javascript" src="/assets/js/script.js"></script>
</html>
