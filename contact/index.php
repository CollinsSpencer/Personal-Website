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
  <div class="centered">
    <section class="horizontal horizontal-2 flex">
      <article>
        <section class="vertical vertical-2 flex">
          <article style="min-height:50px;background-color:red"></article>
          <article style="min-height:50px;background-color:blue"></article>
        </section>
      </article>

      <article style="min-height:50px;background-color:grey">
        <!-- Contact form -->
        <section id="contact">
          <div class="darkish container-fluid">
            <div class="row bottom text-center">
              <h1 class="heading">Contact Me</h1>
              <h4>If you have any questions or would like to get in contact with me, feel free to use the following form.</h4>
            </div>
            <form id="contactForm" method="post" action="">
              <section class="vertical flex">
                <article>
                  <section class="horizontal horizontal-2 flex">
                    <article>
                      <input id="firstName" class="form-control" type="text" name="fields[first_name]" placeholder="First Name">
                    </article>
                    <article>
                      <input id="lastName" class="form-control" type="text" name="fields[last_name]" placeholder="Last Name">
                    </article>
                  </section>
                </article>
                <article>
                  <input id="email" class="form-control" type="email" name="fields[email]" placeholder="Email">
                </article>
                <article>
                  <input id="subject" class="form-control" type="text" name="fields[subject]" placeholder="Subject">
                </article>
                <article>
                  <textarea id="message" class="form-control" name="fields[message]" placeholder="Message" rows="3" cols="50"></textarea>
                </article>
                <article>
                  <section class="horizontal horizontal-2 flex">
                    <article>
                      <input id="submit" class="form-control" type="submit" name="fields[send]" value="Send">
                    </article>
                    <article>
                      <input id="reset" class="form-control" type="reset" name="fields[reset]" value="Reset">
                    </article>
                  </section>
                </article>
              </section>
            </form>
            <div class="row bottom text-center">
              <h5>You will also receive a copy of your message.</h5>
            </div>
          </div>
        </section>
      </article>
    </section>
  </div>



  <div style="height: 2000px">
    <h1>Hello World!<h1>
  </div>

  <section>
    <a href="/about/">About</a>
  </section>
<body>

<?php require_once "../server/footer.php"; ?>
<script type="text/javascript" src="/assets/js/script.js"></script>
</html>
