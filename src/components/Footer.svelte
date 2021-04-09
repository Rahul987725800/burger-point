<script>
</script>

<!-- html -->
<div class="footer">
  <div class="links">
    <p>Docs</p>
    <p>Pricing</p>
    <p>Support</p>
    <p>News</p>
    <p>Terms</p>
  </div>
  <div class="dev-info">@ 2021 RahulGuptaDevelopment</div>
</div>

<!-- /html -->
<style lang="scss">
  .footer {
    background-color: #0e1e25;
    height: 100px;
    padding: 20px 40px;
    @media (max-width: 900px) {
      height: 70px;
      padding: 20px;
    }

    .links {
      display: flex;
      max-width: 300px;
      font-weight: 600;
      justify-content: space-between;
      p {
        padding: 0.3rem 0.5rem;
        color: #7e878b;
        transition: all 0.3s;
        cursor: pointer;
        border-radius: 5px;
        &:hover {
          color: #e4e4e4;
          background-color: rgba(157, 199, 238, 0.103);
        }
      }
    }
    .dev-info {
      color: #7e878b;
      font-size: 14px;
    }
  }
</style>
