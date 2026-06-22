console.log("1️⃣  Testing imports...");

try {
  console.log("2️⃣  Importing express...");
  import('express').then(() => {
    console.log("✅ express OK");

    console.log("3️⃣  Importing cors...");
    import('cors').then(() => {
      console.log("✅ cors OK");

      console.log("4️⃣  Importing dotenv...");
      import('dotenv').then(() => {
        console.log("✅ dotenv OK");

        console.log("5️⃣  Importing mongoose...");
        import('mongoose').then(() => {
          console.log("✅ mongoose OK");

          console.log("6️⃣  Importing routes...");
          import('./routes/authRoutes.js').then(() => {
            console.log("✅ authRoutes OK");

            import('./routes/userRoutes.js').then(() => {
              console.log("✅ userRoutes OK");

              import('./routes/taskRoutes.js').then(() => {
                console.log("✅ taskRoutes OK");

                import('./routes/reportRoutes.js').then(() => {
                  console.log("✅ reportRoutes OK");

                  console.log("7️⃣  Importing connectDB...");
                  import('./config/db.js').then(() => {
                    console.log("✅ connectDB OK");
                    console.log("✅✅✅ ALL IMPORTS SUCCESSFUL");
                  });
                });
              });
            });
          });
        });
      });
    });
  });
} catch (error) {
  console.error("❌ Import error:", error.message);
}
