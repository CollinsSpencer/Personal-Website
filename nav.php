<link rel="stylesheet" href="../assets/css/nav.css">



<nav>
  <a href="/about/" <?php if ($selected == "about"): ?>class="selected"<?php endif; ?>>About</a>
  <a href="/projects/" <?php if ($selected == "projects"): ?>class="selected"<?php endif; ?>>Projects</a>
  <a href="/contact/" <?php if ($selected == "contact"): ?>class="selected"<?php endif; ?>>Contact</a>
</nav>

<?php if (isset($_GET['about'])): ?>class="selected"<?php endif; ?>
